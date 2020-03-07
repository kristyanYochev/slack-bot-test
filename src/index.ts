import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
});

app.command("say-hello", ({command, ack, say}) => {
    ack();
    say(`Hello ${command.user_name}`)
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log("Bolt app is running")
})()