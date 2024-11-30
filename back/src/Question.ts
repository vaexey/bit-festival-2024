export type QuestionStage = "ASKED" | "ANSWERED" | "RATED" | "VERIFY"

export interface Question
{
    stage: QuestionStage

    // Stage ASKED
    question: string
    options: string[]
    shortOptions: string[]

    // Stage ANSWERED
    answer?: string

    // Stage RATED
    result?: string
    accuracy?: number
}

// export class AskedQuestion extends Question
// {
//     stage: QuestionStage = "ASKED"

//     constructor(
//         public question: string,
//         public options: string[],
//         public shortOptions: string[],
//     ) {
//         super()
//     }
// }

// export class AnsweredQuestion extends AskedQuestion
// {
//     stage: QuestionStage = "ANSWERED"

//     constructor(
//         public question: string,
//         public options: string[],
//         public shortOptions: string[],
//     ) {
//         super()
//     }
// }