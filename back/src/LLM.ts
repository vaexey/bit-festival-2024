import Groq from 'groq-sdk'
import API_KEY from './API_KEY.json'
import { LLMSession } from './LLMSession'

export class LLM
{
    client: Groq
    model: string = "llama3-8b-8192"

    constructor()
    {
        this.client = new Groq({
            apiKey: API_KEY.groq
        })
    }

    create(): LLMSession
    {
        return new LLMSession(this);
    }
}