import { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } from '@discordjs/voice';
import { logger } from '../utils/logger.js';
import { YoutubeService } from './youtubeService.js';
import { SpotifyService } from './spotifyService.js';
import { SoundCloudService } from './soundcloudService.js';
import { Song } from '../models/index.js';

export class MusicService {
  static async searchAndAdd(query, interaction) {
    try {
      // Determine the streaming service based on the query
      let searchResult;
      if (query.includes('youtube.com')) {
        searchResult = await YoutubeService.search(query);
      } else if (query.includes('spotify.com')) {
        searchResult = await SpotifyService.search(query);
      } else if (query.includes('soundcloud.com')) {
        searchResult = await SoundCloudService.search(query);
      } else {
        // Default to YouTube search if no service is identified
        searchResult = await YoutubeService.search(query);
      }

      if (!searchResult) {
        logger.warn(`No results found for query: ${query}`);
        interaction.reply('No results found for that query!');
        return null;
      }

      // Get the audio stream and song info based on the streaming service
      let stream;
      let videoInfo;
      if (searchResult.service === 'youtube') {
        const videoId = searchResult.id.videoId;
        stream = await YoutubeService.getAudioStream(videoId);
        videoInfo = await YoutubeService.getVideoInfo(videoId);
      } else if (searchResult.service === 'spotify') {
        stream = await SpotifyService.getAudioStream(searchResult.uri);
        videoInfo = {
          videoDetails: {
            title: searchResult.name,
            author: { name: searchResult.artists[0].name },
            album: searchResult.album.name,
            lengthSeconds: searchResult.duration_ms / 1000,
          },
        };
      } else if (searchResult.service === 'soundcloud') {
        stream = await SoundCloudService.getAudioStream(searchResult.permalink_url);
        videoInfo = {
          videoDetails: {
            title: searchResult.title,
            author: { name: searchResult.user.username },
            album: null,
            lengthSeconds: searchResult.duration / 1000,
          },
        };
      }

      const duration = videoInfo.videoDetails.lengthSeconds;
      const song = new Song({
        title: videoInfo.videoDetails.title,
        artist: videoInfo.videoDetails.author.name,
        album: videoInfo.videoDetails.album,
        duration: duration,
        url: searchResult.url,
        stream: stream,
        service: searchResult.service,
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
    // Initialize the music service (e.g., load any necessary data, connect to APIs).
  }
}