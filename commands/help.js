import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of available commands'),
  async execute(interaction) {
    const commands = interaction.client.commands.filter((command) => command.data.name !== 'help');
    const commandsEmbed = interaction.client.embedBuilder
      .setTitle('Discord Music Bot - Commands')
      .setDescription('Here are all the commands available for this bot:')
      .setColor(0x00ff00);

    commands.each((command) => {
      commandsEmbed.addFields({
        name: `/${command.data.name}`,
        value: command.data.description,
      });
    });

    await interaction.reply({ embeds: [commandsEmbed] });
  },
};