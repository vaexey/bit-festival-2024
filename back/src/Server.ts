import express, { Application } from 'express';

export class Server
{
    app: Application
    port: number = 7331

    constructor()
    {
        this.app = express();

        this.app.use(express.static("public"))
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}/`)
        })
    }
}