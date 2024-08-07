import { QueueService } from '../services/queueService.js';
import { MusicService } from '../services/musicService.js';
import { logger } from '../utils/logger.js';

export default async (message) => {
  if (message.author.bot) return;

  // Check if the message starts with the bot's prefix
  if (!message.content.startsWith(process.env.BOT_PREFIX)) return;

  // Remove the prefix from the message content
  const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Handle commands
  switch (command) {
    case 'play': {
      const query = args.join(' ');
      if (!query) {
        return message.reply('Please provide a song name or URL!');
      }

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.reply('You need to be in a voice channel to use this command!');
      }

      try {
        const queue = QueueService.getQueue(message.guild);
        if (!queue) {
          await voiceChannel.join();
          message.reply(`Joined ${voiceChannel.name}! Now playing...`);
        } else if (voiceChannel !== queue.voiceChannel) {
          return message.reply(`I'm already in the ${queue.voiceChannel.name} voice channel.`);
        }

        const song = await MusicService.searchAndAdd(query, message);
        if (!song) {
          return;
        }

        if (queue.songs.length === 0) {
          await queue.player.play(song);
        } else {
          message.reply(`Added ${song.title} to the queue!`);
        }
      } catch (error) {
        logger.error('Error playing song:', error);
        message.reply('There was an error playing the song!');
      }
      break;
    }
    case 'skip': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      try {
        await queue.player.stop();
        message.reply(`Skipped the current song!`);
      } catch (error) {
        logger.error('Error skipping song:', error);
        message.reply('There was an error skipping the song!');
      }
      break;
    }
    case 'stop': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      try {
        await queue.player.stop();
        await queue.voiceChannel.leave();
        message.reply('Stopped the music and cleared the queue!');
      } catch (error) {
        logger.error('Error stopping music and leaving voice channel:', error);
        message.reply('There was an error stopping the music!');
      }
      break;
    }
    case 'queue': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      const queueEmbed = message.client.embedBuilder
        .setTitle(`Queue for ${message.guild.name}`)
        .setColor(0x00ff00);

      if (queue.songs.length === 0) {
        queueEmbed.setDescription('The queue is empty!');
      } else {
        const queueDisplay = queue.songs
          .map((song, index) => `${index + 1}. ${song.title}`)
          .join('\n');
        queueEmbed.setDescription(queueDisplay);
      }

      await message.reply({ embeds: [queueEmbed] });
      break;
    }
    case 'join': {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.reply('You need to be in a voice channel to use this command!');
      }

      try {
        const queue = QueueService.getQueue(message.guild);
        if (!queue) {
          await voiceChannel.join();
          message.reply(`Joined ${voiceChannel.name}!`);
        } else {
          return message.reply(`I'm already in the ${queue.voiceChannel.name} voice channel.`);
        }
      } catch (error) {
        logger.error('Error joining voice channel:', error);
        message.reply('There was an error joining the voice channel!');
      }
      break;
    }
    case 'leave': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      try {
        await queue.player.stop();
        await queue.voiceChannel.leave();
        message.reply('Left the voice channel!');
      } catch (error) {
        logger.error('Error leaving voice channel:', error);
        message.reply('There was an error leaving the voice channel!');
      }
      break;
    }
    case 'volume': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      const volume = parseInt(args[0], 10);
      if (isNaN(volume) || volume < 0 || volume > 100) {
        return message.reply('Please enter a valid volume level between 0 and 100!');
      }

      queue.volume = volume / 100;
      queue.player.setVolume(queue.volume);
      message.reply(`Volume set to ${volume}%!`);
      break;
    }
    case 'nowplaying': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      const currentSong = queue.songs[0];
      const embed = message.client.embedBuilder
        .setTitle(`Now Playing: ${currentSong.title}`)
        .setDescription(
          `Artist: ${currentSong.artist}\nAlbum: ${currentSong.album}\nDuration: ${currentSong.duration}`
        )
        .setColor(0x00ff00);
      await message.reply({ embeds: [embed] });
      break;
    }
    case 'loop': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      if (args[0] === 'song') {
        queue.loopSong = !queue.loopSong;
        message.reply(`Looping mode set to ${queue.loopSong ? 'song' : 'off'}!`);
      } else if (args[0] === 'queue') {
        queue.loopQueue = !queue.loopQueue;
        message.reply(`Looping mode set to ${queue.loopQueue ? 'queue' : 'off'}!`);
      } else {
        message.reply('Invalid loop mode. Use "song" or "queue".');
      }
      break;
    }
    case 'shuffle': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      queue.songs = queue.songs.sort(() => Math.random() - 0.5);
      message.reply('Queue shuffled!');
      break;
    }
    case 'remove': {
      const queue = QueueService.getQueue(message.guild);
      if (!queue) {
        return message.reply('There is no music playing in this server!');
      }

      const trackNumber = parseInt(args[0], 10);
      if (isNaN(trackNumber) || trackNumber > queue.songs.length || trackNumber <= 0) {
        return message.reply('Invalid track number!');
      }

      const removedSong = queue.songs.splice(trackNumber - 1, 1)[0];
      message.channel.send(`Removed ${removedSong.title} from the queue!`);
      break;
    }
    case 'help': {
      const commands = message.client.commands.filter((command) => command.data.name !== 'help');
      const commandsEmbed = message.client.embedBuilder
        .setTitle('Discord Music Bot - Commands')
        .setDescription('Here are all the commands available for this bot:')
        .setColor(0x00ff00);

      commands.each((command) => {
        commandsEmbed.addFields({
          name: `/${command.data.name}`,
          value: command.data.description,
        });
      });

      await message.reply({ embeds: [commandsEmbed] });
      break;
    }
    default: {
      message.reply('Invalid command!');
    }
  }
};