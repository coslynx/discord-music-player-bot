import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music and clears the queue'),
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
        content: 'Stopped the music and cleared the queue!',
      });
    } catch (error) {
      console.error('Error stopping music and leaving voice channel:', error);
      interaction.reply({
        content: 'There was an error stopping the music!',
      });
    }
  },
};