
type QuestionStage = "ASKED" | "ANSWERERD" | "RATED";

export interface QuestionModel {
	stage: QuestionStage
	//
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

