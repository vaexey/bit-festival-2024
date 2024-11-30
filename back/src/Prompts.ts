import { Question } from "./Question"

export class Prompts
{
    static firstQuestion = "Your task is to assign me a hobby that is best suited for me. Ask me a question that will help you find me a hobby. Your response should contain only one question ending with a question mark."

    static optionsFor(question: string): string
    {
        return `Prepare from 2 to 8 most common answers for this question: "${question}". Answers should not be longer than one sentence and should not be longer than 6 words. Provide answers from all the spectrum. There should be at least two contradicting answers. Your response should contain only answers contained in square brackets separated by semicolons.`
    }

    static shortcutFrom(phrase: string): string
    {
        return `Extract the most important word from the phrase below. Respond only with the selected word.`
            + `"${phrase}"`
    }

    static emojiFrom(phrase: string): string
    {
        return `Give me an emoji that best suits phrase "${phrase}". Respond only with the emoji.`
    }

    static hobbyFor(questions: Question[])
    {
        return `Return a hobby that suits the best a person that responded to the questions below. Your response should contain only the hobby name and nothing else. \r\n`
            + Prompts.resolveQuestions(questions)
    }

    static nextQuestion(questions: Question[])
    {
        return `Your task is to assign me a hobby that is best suited for me. Ask me another question that will help you find me a hobby. Below are my answers for other questions for context. Your response should contain only one question ending with a question mark. \r\n`
            + Prompts.resolveQuestions(questions)
    }

    static hobbyRating(questions: Question[], hobby: string)
    {
        return `Your task is to rate if hobby "${hobby}" would be fun for a person that answered the questions below. Your response should contain only the rating value ranging from 0 - least fun to 100 - most fun.`
            + Prompts.resolveQuestions(questions)
    }

    static resolveQuestions(questions: Question[]): string
    {
        return questions.map(q => 
            `Question: ${q.question}\r\nAnswer: ${q.answer}`
        ).join("\r\n")
    }
}