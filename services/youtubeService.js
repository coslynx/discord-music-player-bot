import { youtubeSearch } from 'youtube-search-api';
import ytdl from 'ytdl-core';
import { logger } from '../utils/logger.js';

export class YoutubeService {
  static async search(query) {
    try {
      const results = await youtubeSearch(query);
      if (!results.length) {
        logger.warn(`No results found for query: ${query}`);
        return null;
      }
      return results[0];
    } catch (error) {
      logger.error('Error searching YouTube:', error);
      return null;
    }
  }

  static async getAudioStream(videoId) {
    try {
      const stream = ytdl(videoId, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });
      return stream;
    } catch (error) {
      logger.error('Error getting YouTube audio stream:', error);
      return null;
    }
  }

  static async getVideoInfo(videoId) {
    try {
      const info = await ytdl.getInfo(videoId);
      return info;
    } catch (error) {
      logger.error('Error getting YouTube video info:', error);
      return null;
    }
  }
}