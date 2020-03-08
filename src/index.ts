import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const bot = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

bot.command('/bag', async ({command, ack, say}) => {
    ack('WAIT U STUPID BISH');
    let foaas_response = await axios.request({
        url: `https://www.foaas.com/bag/${command.user_name}`,
        headers: {
            'Accept': 'application/json'
        }
    });
    say(`${foaas_response.data.message} ${foaas_response.data.subtitle}`);
});

(async () => {
    bot.start(process.env.PORT || 3000)
    console.log('App is running')
})()