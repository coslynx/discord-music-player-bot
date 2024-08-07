import { SlashCommandBuilder } from 'discord.js';
import { QueueService } from '../services/queueService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loops the current song or the entire queue')
    .addStringOption((option) =>
      option
        .setName('mode')
        .setDescription('The loop mode (song, queue, off)')
        .setRequired(true)
        .addChoices(
          { name: 'Song', value: 'song' },
          { name: 'Queue', value: 'queue' },
          { name: 'Off', value: 'off' }
        )
    ),
  async execute(interaction) {
    const queue = QueueService.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server!',
      });
    }

    const mode = interaction.options.getString('mode');
    if (mode === 'song') {
      queue.loopSong = !queue.loopSong;
      interaction.reply({
        content: `Looping mode set to ${queue.loopSong ? 'song' : 'off'}!`,
      });
    } else if (mode === 'queue') {
      queue.loopQueue = !queue.loopQueue;
      interaction.reply({
        content: `Looping mode set to ${queue.loopQueue ? 'queue' : 'off'}!`,
      });
    } else if (mode === 'off') {
      queue.loopSong = false;
      queue.loopQueue = false;
      interaction.reply({
        content: 'Looping mode turned off!',
      });
    }
  },
};