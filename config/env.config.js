import dotenv from 'dotenv';

dotenv.config();

export const token = process.env.DISCORD_BOT_TOKEN;
export const youtubeApiKey = process.env.YOUTUBE_API_KEY;
export const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
export const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
export const soundcloudClientId = process.env.SOUNDCLOUD_CLIENT_ID;
export const soundcloudClientSecret = process.env.SOUNDCLOUD_CLIENT_SECRET;
export const lastfmApiKey = process.env.LASTFM_API_KEY;
export const mongoUri = process.env.MONGODB_URI;
export const botPrefix = process.env.BOT_PREFIX || '!';