import { logger } from './logger.js';

export default class CommandHandler {
  constructor(client) {
    this.client = client;
  }

  async handleCommand(interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = this.client.commands.get(interaction.commandName);
    if (!command) {
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(`Error executing command ${interaction.commandName}:`, error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
      });
    }
  }
}