import express, { Application, Request } from 'express';
import { HobbySession } from './HobbySession';
import { LLM } from './LLM';

type SesRes = Request & {
    session?: HobbySession
}

export class Server
{
    app: Application
    llm: LLM
    port: number = 7331

    sessions: HobbySession[] = []

    private sessionIncr = 0;

    constructor()
    {
        this.app = express()
        this.llm = new LLM()

        this.app.use(express.static("public"))

        this.app.use(async (req: SesRes, res, next) => {
            const sessionKey = req.query['session']

            const session = this.sessions.find(s => s.id == sessionKey)

            req.session = session

            next()
        })

        this.app.get("/api/newSession", async (req: SesRes, res) => {
            try {
                const id = (++this.sessionIncr)+""
    
                const newSession = new HobbySession(
                    id,
                    this.llm
                )
    
                this.sessions.push(newSession)
    
                await newSession.loadFirstQuestion()
    
                res.send(id)
                res.end()
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.get("/api/questions", async (req: SesRes, res) => {
            try{
                if(!req.session)
                {
                    res.sendStatus(401);
                    return
                }

                res.send(JSON.stringify(req.session.questions, null, 4))

                res.end();
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.get("/api/answer", async (req: SesRes, res) => {
            try{
                if(!req.session)
                {
                    res.sendStatus(401);
                    return;
                }

                const answer = req.query['content']

                if(!answer)
                {
                    res.sendStatus(400)
                    return;
                }

                await req.session.answer(answer + "")

                res.sendStatus(200)
                return
            } catch (error) {
                res.status(500).send(error)
            }
        })

        this.app.get("/api/results", async (req: SesRes, res) => {
            if(!req.session)
            {
                res.sendStatus(401);
                return;
            }

            res.send(
                JSON.stringify(
                    req.session.getBestResults(),
                    null,
                    4
                )
            )

            return
        })
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}/`)
        })
    }
}