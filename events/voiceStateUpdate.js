import { QueueService } from '../services/queueService.js';

export default async (oldState, newState) => {
  const guild = oldState.guild;
  const member = newState.member;
  const queue = QueueService.getQueue(guild);

  // If the bot is in the same voice channel as the member, and the member leaves, leave the channel too.
  if (
    queue &&
    queue.voiceChannel === oldState.channel &&
    !newState.channel
  ) {
    try {
      await queue.player.stop();
      await queue.voiceChannel.leave();
    } catch (error) {
      console.error('Error leaving voice channel:', error);
    }
  }
};