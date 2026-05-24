// Main config of Bot 

const express = require('express');
require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

commandHandler(client);
eventHandler(client);

const app = express();
app.get('/', (req,res) => {
    res.send('Skyla is online!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

client.login(process.env.TOKEN);
