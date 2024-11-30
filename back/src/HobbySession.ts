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
        let optionsRaw = await this.llm.ask(Prompts.optionsFor(question))

        let inner = optionsRaw.split("[")[1].split("]")[0]
        let options = inner.split(";").map(x => x.trim())

        this.questions.push({
            stage: "ASKED",
            question,
            options,
            shortOptions: options
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

        const accuracyRaw = await this.llm.ask(Prompts.hobbyRating(this.questions, last.result))

        let accuracy = +accuracyRaw.trim()

        if(isNaN(accuracy))
        {
            console.warn(`NaN accuracy from: ${accuracyRaw}`)

            accuracy = 0
        }

        last.accuracy = accuracy / 100
        last.stage = "RATED"

        // if(last.accuracy > 0)
        // {

        // }
        await this.loadNextQuestion();
    }
}