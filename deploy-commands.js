const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const config = require('./config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('create')
    .setDescription('Créer un projet de bot')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log("Déploiement commandes...");

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    console.log("OK commandes déployées");
  } catch (err) {
    console.error(err);
  }
})();
