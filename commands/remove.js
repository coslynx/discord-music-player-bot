import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a song from the queue')
    .addIntegerOption((option) =>
      option
        .setName('tracknumber')
        .setDescription('The track number in the queue to remove')
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    const trackNumber = interaction.options.getInteger('tracknumber');
    if (trackNumber > queue.songs.length || trackNumber <= 0) {
      return interaction.reply({
        content: 'Invalid track number!',
      });
    }

    const removedSong = queue.songs.splice(trackNumber - 1, 1)[0];
    queue.textChannel.send({
      content: `Removed ${removedSong.title} from the queue!`,
    });
  },
};