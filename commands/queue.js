import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows the current music queue'),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    const queueEmbed = interaction.client.embedBuilder
      .setTitle(`Queue for ${interaction.guild.name}`)
      .setColor(0x00ff00);

    if (queue.songs.length === 0) {
      queueEmbed.setDescription('The queue is empty!');
    } else {
      const queueDisplay = queue.songs
        .map((song, index) => `${index + 1}. ${song.title}`)
        .join('\n');
      queueEmbed.setDescription(queueDisplay);
    }

    await interaction.reply({ embeds: [queueEmbed] });
  },
};