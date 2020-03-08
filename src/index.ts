import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface FoaasResponse {
    message: string,
    subtitle: string
};

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
    let response_data = foaas_response.data as FoaasResponse;
    say(`${response_data.message} ${response_data.subtitle}`);
});

(async () => {
    bot.start(process.env.PORT || 3000)
    console.log('App is running')
})()