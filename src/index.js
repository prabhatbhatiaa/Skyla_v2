// Main config of Bot 

require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandFiles = fs
    .readdirSync('./src/commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log(`${client.user.tag} is online.`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } 
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'Error executing command.',
            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);