import type { QuestionModel } from "./question";
export const new_session = async() : Promise<string> => {
	let res = await fetch(`api/newsession`);
	return res.text()
}

export const get_questions = async (session : string) : Promise<QuestionModel[]> => {
	let res = await fetch(`api/questions?session=${session}`);
	let body = JSON.parse(await res.text());
	return body as Promise<QuestionModel[]>;
}

export const send_answer = async (session : string, content : string, questions_obj : {questions : QuestionModel[], curr_question : string}) => {
	await fetch(`api/answer?session=${session}&content=${content}`);
	let questions = await get_questions(session);
	let curr_question = questions.length > 0 ? questions[questions.length- 1].question : "...";
	questions_obj.questions = questions;
	questions_obj.curr_question = curr_question;
};

export const get_results = async (session : string) => {
	let res = await fetch(`/api/results?session=${session}`);
	let results = await res.text();
}
