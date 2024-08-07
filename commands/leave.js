import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Makes the bot leave the voice channel'),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    try {
      await queue.player.stop();
      await queue.voiceChannel.leave();
      interaction.reply({
        content: 'Left the voice channel!',
      });
    } catch (error) {
      console.error('Error leaving voice channel:', error);
      interaction.reply({
        content: 'There was an error leaving the voice channel!',
      });
    }
  },
};