import { LLM } from "./LLM";
import { LLMSession } from "./LLMSession";
import { Question } from "./Question";
import { Prompts } from "./Prompts";

export class HobbySession
{
    questions: Question[] = []

    constructor(
        public id: string,
        private llm: LLM
    ) {
    }

    async loadFirstQuestion()
    {
        let question = await this.llm.ask(Prompts.firstQuestion)

        await this.addQuestion(question)
    }

    async loadNextQuestion()
    {
        let question = await this.llm.ask(Prompts.nextQuestion(this.questions))

        await this.addQuestion(question)
    }

    async addQuestion(question: string)
    {
        let sentences = question.split(".")

        if(sentences.length > 1)
        {
            question = sentences[sentences.length - 1].trim()
        }

        let optionsRaw = await this.llm.ask(Prompts.optionsFor(question))

        let inner = optionsRaw.split("[")[1].split("]")[0]
        let options = inner.split(";").map(x => x.trim())

        options = options.slice(0, 8)

        let shortOptions = await Promise.all(options.map(o => {
            if(o.split(" ").length > 3)
            {
                return this.llm.ask(Prompts.shortcutFrom(o))
            }

            return o
        }))

        shortOptions = shortOptions.map(o => {
            let str = o.replaceAll(/[^a-zA-Z ]/g, "").trim().toLowerCase().split("")
            
            str[0] = str[0].toUpperCase()

            return str.join("")
        })

        shortOptions = await Promise.all(shortOptions.map(async (o) => {
            const emoji = await this.llm.ask(Prompts.emojiFrom(o))

            return `${emoji} ${o}`
        }))

        this.questions.push({
            stage: "ASKED",
            question,
            options,
            shortOptions
        })
    }

    async answer(answer: string)
    {
        const last = this.questions[this.questions.length - 1]

        if(last.stage != "ASKED")
            throw `Cant answer question of stage ${last.stage}`

        last.answer = answer
        last.stage = "ANSWERED"

        await this.rate()
    }

    async rate()
    {
        const last = this.questions[this.questions.length - 1]

        if(last.stage != "ANSWERED")
            throw `Cant rate question of stage ${last.stage}`

        last.result = await this.llm.ask(Prompts.hobbyFor(this.questions))
        last.resultEmoji = await this.llm.ask(Prompts.emojiFrom(last.result))
        
        const accuracyRaw = await this.llm.ask(Prompts.hobbyRating(this.questions, last.result))

        let accuracy = +accuracyRaw.trim()

        if(isNaN(accuracy))
        {
            console.warn(`NaN accuracy from: ${accuracyRaw}`)

            accuracy = 0
        }

        const trustFactor = 1-Math.exp(-0.2*this.questions.length)

        accuracy /= 100
        accuracy *= trustFactor

        last.accuracy = accuracy
        last.stage = "RATED"

        // if(last.accuracy > 0)
        // {

        // }
        await this.loadNextQuestion();
    }

    getBestResults(): { result: string, accuracy: number }[]
    {
        let results = this.questions
            .filter(q => q.stage == "RATED")
            .map(q => {
                return {
                    result: q.result,
                    emoji: q.resultEmoji,
                    accuracy: q.accuracy,
                }
            })

        results.sort((a,b) => b.accuracy - a.accuracy)

        return results
    }
}