// Upload slash command to Discord API

require('dotenv').config();
const { REST, Routes } = require('discord.js');
const pingCommand = require('./commands/ping');

const commands = [pingCommand.data.toJSON()];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log("Register Slash Commands..")
        await rest.put (
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );
        console.log("Slash commands uploadeded!")
    }
    catch(err) {
        console.error(err);
    }
})();