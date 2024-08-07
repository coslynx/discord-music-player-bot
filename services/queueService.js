import { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } from '@discordjs/voice';
import { logger } from '../utils/logger.js';
import { YoutubeService } from './youtubeService.js';
import { Song } from '../models/index.js';

export class QueueService {
  static queues = new Map();

  static getQueue(guild) {
    return this.queues.get(guild.id);
  }

  static createQueue(guild, voiceChannel, textChannel) {
    const queue = {
      guild,
      voiceChannel,
      textChannel,
      connection: null,
      player: null,
      songs: [],
      loopSong: false,
      loopQueue: false,
      volume: 0.5,
      isPlaying: false,
    };

    const player = createAudioPlayer();
    player.on('error', (error) => {
      logger.error('Player error:', error);
    });
    player.on('finish', async () => {
      queue.isPlaying = false;
      if (queue.loopSong) {
        await queue.player.play(createAudioResource(queue.songs[0].stream, { inlineVolume: true }));
      } else if (queue.loopQueue) {
        const nextSong = queue.songs.shift();
        queue.songs.push(nextSong);
        await this.play(queue);
      } else {
        if (queue.songs.length > 0) {
          await this.play(queue);
        } else {
          await queue.voiceChannel.leave();
          queue.textChannel.send('Queue finished!');
        }
      }
    });

    queue.player = player;

    this.queues.set(guild.id, queue);
    return queue;
  }

  static async play(queue) {
    if (queue.isPlaying) return;

    queue.isPlaying = true;
    const song = queue.songs[0];
    logger.info(`Playing ${song.title} in ${queue.voiceChannel.name}`);
    const resource = createAudioResource(song.stream, { inlineVolume: true });
    resource.volume.setVolume(queue.volume);
    queue.player.play(resource);
  }

  static async addSong(guild, voiceChannel, textChannel, song) {
    const queue = this.getQueue(guild) || this.createQueue(guild, voiceChannel, textChannel);
    queue.songs.push(song);
    if (!queue.isPlaying) {
      await this.play(queue);
    }
    return queue;
  }

  static async searchAndAdd(query, interaction) {
    try {
      const searchResult = await YoutubeService.search(query);
      const videoId = searchResult.id.videoId;
      const stream = await YoutubeService.getAudioStream(videoId);
      const videoInfo = await YoutubeService.getVideoInfo(videoId);
      const duration = videoInfo.videoDetails.lengthSeconds;
      const song = new Song({
        title: videoInfo.videoDetails.title,
        artist: videoInfo.videoDetails.author.name,
        album: videoInfo.videoDetails.album,
        duration: duration,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        stream: stream,
      });
      await song.save();
      return song;
    } catch (error) {
      logger.error('Error searching and adding song:', error);
      interaction.reply('There was an error finding the song!');
      return null;
    }
  }

  static async init() {
    // Initialize the queue service.
  }
}