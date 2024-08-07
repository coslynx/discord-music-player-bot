import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjusts the volume of the music')
    .addIntegerOption((option) =>
      option
        .setName('volume')
        .setDescription('The volume level (0-100)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    const volume = interaction.options.getInteger('volume');
    if (volume < 0 || volume > 100) {
      return interaction.reply({
        content: 'Please enter a valid volume level between 0 and 100!',
      });
    }

    queue.volume = volume / 100;
    queue.player.setVolume(queue.volume);
    interaction.reply({
      content: `Volume set to ${volume}%!`,
    });
  },
};