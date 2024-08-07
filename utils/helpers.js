import { logger } from './logger.js';

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()  (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getQueueDisplay = (queue) => {
  if (queue.songs.length === 0) {
    return 'The queue is empty!';
  }

  const queueDisplay = queue.songs
    .map((song, index) => `${index + 1}. ${song.title}`)
    .join('\n');
  return queueDisplay;
};

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