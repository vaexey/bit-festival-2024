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

    append(msg: Message)
    {
        this.messages.push(msg)
    }

    appendAll(msgs: Message[])
    {
        this.messages = [...this.messages, ...msgs]
    }

    async ask(content: string, append?: boolean): Promise<Message>
    {
        if(append === undefined)
            append = true

        const msg: Message = {
            content,
            role: "user"
        }

        const params = {
            messages: [...this.messages, msg],
            model: this.llm.model
        }

        const completion = await this.llm.client.chat.completions.create(params)

        const response = completion.choices[0].message as any as Message

        if(append)
        {
            this.appendAll([
                msg,
                response
            ])
        }

        return response
    }
}