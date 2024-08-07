import { Client, IntentsBitField } from 'discord.js';
import { QueueService } from '../services/queueService.js';
import { MusicService } from '../services/musicService.js';
import { logger } from '../utils/logger.js';
import { token } from '../config/env.config.js';

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessages] });

client.on('ready', async () => {
  logger.info(`Bot is ready! Logged in as ${client.user.tag}`);

  client.commands.forEach((command) => {
    if (command.data.name === 'play' || command.data.name === 'stop') {
      client.application.commands.create(command.data);
    }
  });

  try {
    await MusicService.init();
  } catch (error) {
    logger.error('Error initializing music service:', error);
  }

  try {
    await QueueService.init();
  } catch (error) {
    logger.error('Error initializing queue service:', error);
  }
});

client.login(token);