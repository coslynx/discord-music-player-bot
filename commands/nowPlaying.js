import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Shows information about the currently playing song'),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    const currentSong = queue.songs[0];
    const embed = interaction.client.embedBuilder
      .setTitle(`Now Playing: ${currentSong.title}`)
      .setDescription(
        `Artist: ${currentSong.artist}\nAlbum: ${currentSong.album}\nDuration: ${currentSong.duration}`
      )
      .setColor(0x00ff00);
    await interaction.reply({ embeds: [embed] });
  },
};