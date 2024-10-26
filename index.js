global.laughCount = -1;
global.historyArray = [];

function isOnline() {
    console.log('The bot is online.');
}

function handleFileError(err) {
    
    if (err) {
        console.error('Error writing to file', err);
    }

    else {
        console.log('Message logged to DiscordMessageLog.txt succesfully');
    }
}

function logMessage(message) {
    const now = new Date();
    const fs = require('fs');
    const dataToLogIntoTxtFile = message.author.username + ': ' + message.content + ' (Logged at ' + now.toLocaleString() + ')\n';
    fs.appendFile('DiscordMessageLog.txt', dataToLogIntoTxtFile, handleFileError);
}

function testResponse(message) {

    if (message.author.bot)
        return;

    emojisArray = [':sob:', ':rage:', ':triumph:', ':cry:', ':sweat_smile:', ':upside_down:', ':yawning_face:']
    randomNumber = Math.floor((Math.random() * 7))

    if (message.content.toLowerCase().includes('hello') || message.content.toLowerCase().includes('hi') || message.content.toLowerCase().includes('yo'))
        message.reply('I can only respond to this because I can\'t pay for OpenAI API because they won\'t take my card ' + emojisArray[randomNumber]);
}

require('dotenv/config');
const { Client, Guild } = require('discord.js');
const { OpenAI } = require('openai');


const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
}); 

client.on('ready' , isOnline); 

const CHANNELS  = process.env.channelIds.split(",");

 const openai = new OpenAI ({
      apiKey: process.env.openAIKey
  });

// #LIVE REGION#

client.on('messageCreate', logMessage); 

client.on('messageCreate', (message) => { 
    if (message.author.bot)
        return;

    if (CHANNELS.indexOf(message.channelId) < 0) {

        console.log('Invalid channel ID (IN LAUGHING SECTION)');
        return;
    }

    if (global.laughCount >= 1500) 
        global.laughCount = -1;

    global.laughCount++;

    if (message.content.toLowerCase().includes('skb')) {
        message.reply('If you\'re trying to reach me, try @SKB-4 to get a response (This is done to preserve tokens)');
        return;
    }

    if ((message.content.toLowerCase().includes('😂') || message.content.toLowerCase().includes('🤣')) && global.laughCount % 2 === 0) {
        message.reply('بتضحاااك..؟');
        return;
    }
})

 client.on('messageCreate', async (message) => {

    if (message.author.bot)
        return;

    if (!message.mentions.users.has(client.user.id))
         return;

    if (CHANNELS.indexOf(message.channelId) < 0) {

        console.log('Invalid channel ID (IN OPENAI SECTION)');
        return;
    } 

    if (message.content.toLowerCase().includes('weather')) {

        try {
            const weatherResponse = await fetch(process.env.meteoWeatherAPIKey);

            if (!weatherResponse.ok) {
                throw new Error(`Error: ${weatherResponse.statusText}`);
            }

            const dataFromWeather = await weatherResponse.json();    
            cityName = 'City: cityName\n';
            timeZoneReply = 'Timezone: ' + JSON.stringify(dataFromWeather.timezone) + '\n';
            temperatureReply = 'Temperature: ' + dataFromWeather.current.temperature_2m + dataFromWeather.current_units.temperature_2m +'\n';

            message.reply('I have live access to weather information in countryName only, here\'s what I have: \n\n' + cityName + timeZoneReply + temperatureReply);

        } catch (error) {

            console.error('Failed to fetch weather data:', error.message);
            message.reply('Sorry, I couldn\'t fetch the weather data. Please try again later.');
        }
        return;
    }

    historyArray.push({role: 'user', content: message.content, channelId: message.channelId});

    if (historyArray.length >= 20) {

        historyArray.shift();
    }

    messageToReplyToIndex = historyArray[historyArray.length - 1];

    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                //name:
                role: 'system',
                content: 'SKB-4 is an integrated GPT model on Discord, standing for Smart Komodo Bot-4, you are provided with an array of messages called historyArray, this array contains the most recent message to respond to, and a history of the past 20 messages, you will reply to the latest message making SURE to only respond to only maintain a history based on channel IDs, as in each channel has its own history, the channel ID attribute has been passed alongside the history array, keeping in mind the previous messages stored in the array, in order to continue conversation. You must also: 1- Track and remember previous messages from the ongoing conversation within the current Discord channel using the provided history array. 2- If addressed with "@SKB-4" recognize that it is meant to facilitate interaction conversationally and not interpret it as an end-of-conversation marker or as a piece of information to process. 3- Maintain a memory of the interaction history in order to provide accurate and consistent responses. 4- Respond thoughtfully and relevantly by considering previous messages in the session. 5- Do **NOT** forget messages unless explicitly told by the user. 6- Always aim to carry context through multiple exchanges to avoid incomplete conversations.'
            },
            ...historyArray
        ]
    }).catch((error) => console.error('OpenAI API Error: \n', error))

    message.reply(gptResponse.choices[0].message.content)
})

client.login(process.env.discordBotToken);

// #END LIVE REGION#