import { Question } from "./Question"

export class Prompts
{
    static firstQuestion = "Your task is to assign me a hobby that is best suited for me. Ask me a question that will help you find me a hobby. Your response should contain only one question ending with a question mark."

    static optionsFor(question: string): string
    {
        return `Prepare from 2 to 9 most common answers for this question: "${question}". Answers should not be longer than one sentence and should not be longer than 6 words. Provide answers from all the spectrum. There should be at least two contradicting answers. Your response should contain only answers contained in square brackets separated by semicolons.`
    }

    static hobbyFor(questions: Question[])
    {
        return `Return a hobby that suits the best a person that responded to the questions below. Your response should contain only the hobby name and nothing else. \r\n`
            + questions.map(q => `${q.question} ${q.answer}\r\n`)
    }
}