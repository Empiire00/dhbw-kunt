import { yellow } from "https://deno.land/std@0.113.0/fmt/colors.ts";
// using ws client to connect to SMTP server because telnet won't work
function createWebSocket() {
  const websocket = new WebSocket("ws://localhost:8080");
  websocket.onopen = () => {
    websocket.send(`HELO localhost:8080 1`);
    // websocket.send(`MAIL FROM <user@localhost>`);
    // websocket.send(`DATA 1`);
  };
  websocket.onmessage = (event) => {
    console.log("got:", yellow(event.data));
    // deno-lint-ignore no-inferrable-types
    const msg: string = `RCPT TO <user@localhost>`;
    console.log("sent:", yellow(msg));
    websocket.send(msg);
    // websocket.send(`DATA 1`);
  };
}

createWebSocket();
