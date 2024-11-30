import { LLM } from "./LLM";
import { Server } from "./Server";


// let server = new Server();

// server.listen();

async function name() {
    let a = new LLM();
let x = a.create();

let c = await x.ask("Who is franzl lang")

console.log(c)
}

name();