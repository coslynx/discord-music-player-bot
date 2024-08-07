import { logger } from './logger.js';

export const handleQueueError = (error, queue) => {
  logger.error('Error in queue:', error);
  queue.textChannel.send('An error occurred in the queue. Please try again!');
};

export const handlePlayerError = (error, queue) => {
  logger.error('Error in player:', error);
  queue.textChannel.send('An error occurred in the player. Please try again!');
};

export const handleMusicServiceError = (error, interaction) => {
  logger.error('Error in music service:', error);
  interaction.reply('An error occurred while searching for the song. Please try again!');
};

export const handlePlaylistServiceError = (error, interaction) => {
  logger.error('Error in playlist service:', error);
  interaction.reply('An error occurred while managing playlists. Please try again!');
};