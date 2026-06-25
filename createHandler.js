const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const config = require('./config.json');

module.exports.handleCreate = async (interaction) => {

  /* TITRE */
  await interaction.reply({
    content: "📝 Donne un TITRE pour ton projet :",
    ephemeral: true
  });

  const filter = m => m.author.id === interaction.user.id;

  const titleCollector = interaction.channel.createMessageCollector({
    filter,
    max: 1,
    time: 60000
  });

  titleCollector.on('collect', async (titleMsg) => {
    const title = titleMsg.content;

    /* DESCRIPTION */
    interaction.followUp({
      content: "📄 Donne une DESCRIPTION :",
      ephemeral: true
    });

    const descCollector = interaction.channel.createMessageCollector({
      filter,
      max: 1,
      time: 120000
    });

    descCollector.on('collect', async (descMsg) => {
      const description = descMsg.content;

      /* SALON PRIVÉ */
      const channel = await interaction.guild.channels.create({
        name: `bot-${interaction.user.username}`,
        parent: config.categoryId,

        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["ViewChannel"]
          },
          {
            id: interaction.user.id,
            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
          },
          {
            id: config.staffRoleId,
            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
          }
        ]
      });
