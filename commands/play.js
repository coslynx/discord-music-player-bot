import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';
import { MusicService } from '../services/musicService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from YouTube, Spotify, or SoundCloud')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('The song name or URL to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');
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
          content: `Joined ${voiceChannel.name}! Now playing...`,
        });
      } else if (voiceChannel !== queue.voiceChannel) {
        return interaction.reply({
          content: `I'm already in the ${queue.voiceChannel.name} voice channel.`,
        });
      }

      const song = await MusicService.searchAndAdd(query, interaction);
      if (!song) {
        return;
      }

      if (queue.songs.length === 0) {
        await queue.player.play(song);
      } else {
        interaction.reply({
          content: `Added ${song.title} to the queue!`,
        });
      }
    } catch (error) {
      console.error('Error playing song:', error);
      interaction.reply({
        content: 'There was an error playing the song!',
      });
    }
  },
};