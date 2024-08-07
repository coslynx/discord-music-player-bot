import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Makes the bot join the voice channel you are in'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: 'You need to be in a voice channel to use this command!',
      });
    }

    try {
      const queue = QueueService.getQueue(interaction.guild);
      if (!queue) {
        await voiceChannel.join();
        interaction.reply({
          content: `Joined ${voiceChannel.name}!`,
        });
      } else {
        return interaction.reply({
          content: `I'm already in the ${queue.voiceChannel.name} voice channel.`,
        });
      }
    } catch (error) {
      console.error('Error joining voice channel:', error);
      interaction.reply({
        content: 'There was an error joining the voice channel!',
      });
    }
  },
};