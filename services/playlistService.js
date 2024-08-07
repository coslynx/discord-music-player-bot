import { logger } from '../utils/logger.js';
import { Playlist, Song } from '../models/index.js';

export class PlaylistService {
  static async createPlaylist(userId, playlistName) {
    try {
      const existingPlaylist = await Playlist.findOne({
        name: playlistName,
        owner: userId,
      });

      if (existingPlaylist) {
        logger.warn(
          `Playlist with name: ${playlistName} already exists for user: ${userId}`
        );
        return null;
      }

      const newPlaylist = new Playlist({
        name: playlistName,
        owner: userId,
        songs: [],
      });

      await newPlaylist.save();
      logger.info(
        `Created playlist with name: ${playlistName} for user: ${userId}`
      );
      return newPlaylist;
    } catch (error) {
      logger.error('Error creating playlist:', error);
      return null;
    }
  }

  static async addSongToPlaylist(playlistId, songId) {
    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        logger.warn(`Playlist with id: ${playlistId} not found`);
        return null;
      }

      const song = await Song.findById(songId);
      if (!song) {
        logger.warn(`Song with id: ${songId} not found`);
        return null;
      }

      if (playlist.songs.includes(songId)) {
        logger.warn(
          `Song with id: ${songId} already exists in playlist with id: ${playlistId}`
        );
        return null;
      }

      playlist.songs.push(songId);
      await playlist.save();
      logger.info(
        `Added song with id: ${songId} to playlist with id: ${playlistId}`
      );
      return playlist;
    } catch (error) {
      logger.error('Error adding song to playlist:', error);
      return null;
    }
  }

  static async removeSongFromPlaylist(playlistId, songId) {
    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        logger.warn(`Playlist with id: ${playlistId} not found`);
        return null;
      }

      const songIndex = playlist.songs.indexOf(songId);
      if (songIndex === -1) {
        logger.warn(
          `Song with id: ${songId} not found in playlist with id: ${playlistId}`
        );
        return null;
      }

      playlist.songs.splice(songIndex, 1);
      await playlist.save();
      logger.info(
        `Removed song with id: ${songId} from playlist with id: ${playlistId}`
      );
      return playlist;
    } catch (error) {
      logger.error('Error removing song from playlist:', error);
      return null;
    }
  }

  static async getPlaylistById(playlistId) {
    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        logger.warn(`Playlist with id: ${playlistId} not found`);
        return null;
      }

      const songs = await Song.find({
        _id: { $in: playlist.songs },
      });

      playlist.songs = songs;
      return playlist;
    } catch (error) {
      logger.error('Error getting playlist by id:', error);
      return null;
    }
  }

  static async getPlaylistsByUserId(userId) {
    try {
      const playlists = await Playlist.find({
        owner: userId,
      });
      return playlists;
    } catch (error) {
      logger.error('Error getting playlists by user id:', error);
      return null;
    }
  }

  static async deletePlaylistById(playlistId) {
    try {
      const playlist = await Playlist.findByIdAndDelete(playlistId);
      if (!playlist) {
        logger.warn(`Playlist with id: ${playlistId} not found`);
        return null;
      }
      logger.info(
        `Deleted playlist with id: ${playlistId} and name: ${playlist.name}`
      );
      return playlist;
    } catch (error) {
      logger.error('Error deleting playlist by id:', error);
      return null;
    }
  }
}