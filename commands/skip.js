import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song'),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    try {
      await queue.player.stop();
      interaction.reply({
        content: `Skipped the current song!`,
      });
    } catch (error) {
      console.error('Error skipping song:', error);
      interaction.reply({
        content: 'There was an error skipping the song!',
      });
    }
  },
};