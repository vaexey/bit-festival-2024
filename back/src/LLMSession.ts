import Groq from "groq-sdk";
import { LLM } from "./LLM";

export type Message = {
    role: "user" | "system",
    content: string
}

export class LLMSession
{
    messages: Message[] = []

    private llm: LLM

    constructor(llm: LLM)
    {
        this.llm = llm;
    }

    async ask(content: string)
    {
        this.messages.push({
            content,
            role: "user"
        })

        const params = {
            messages: this.messages,
            model: this.llm.model
        }

        const completion = await this.llm.client.chat.completions.create(params)

        this.messages.push(completion.choices[0].message as any as Message);

        const response = completion.choices[0].message.content

        return response
    }
}