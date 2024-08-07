import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const { MONGO_URI } = process.env;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB!');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};