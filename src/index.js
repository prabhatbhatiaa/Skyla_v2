// Main config of Bot 

require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

commandHandler(client);
eventHandler(client);

client.login(process.env.TOKEN);
