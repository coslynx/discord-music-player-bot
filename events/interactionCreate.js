import { QueueService } from '../services/queueService.js';
import { MusicService } from '../services/musicService.js';

export default async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
    });
  }
};