<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-music-player-bot
</h1>
<h4 align="center">A Discord bot designed for music playback and enhancing server communities.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Language-JavaScript-yellow" alt="Language: JavaScript">
  <img src="https://img.shields.io/badge/Framework-Discord.js-blue" alt="Framework: Discord.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="Database: MongoDB">
  <img src="https://img.shields.io/badge/API-YouTube-red" alt="API: YouTube">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-music-player-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-music-player-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-music-player-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a project called "discord-music-player-bot" that provides a comprehensive Discord bot for music playback. This bot is designed to seamlessly integrate with popular music streaming services like YouTube, Spotify, and SoundCloud, making it easy for users to enjoy music within their Discord servers. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🎶 | Music Playback | The bot allows users to search for and play music from YouTube, Spotify, and SoundCloud directly within Discord.                     |
| 🔁 | Queue Management | Users can add songs to a shared playlist, skip, remove, or reorder songs in the queue.                                  |
| 🎤 | Voice Channel Management | The bot automatically joins and leaves voice channels based on user commands, enabling seamless integration with voice communication. |
| 💬 | User Interface |  The bot uses a command-based interface for user interaction, providing clear documentation and usage instructions.              |
| 🎧 | Custom Playlists | The bot supports custom playlists created by server members, allowing them to curate specific music collections.                      |
| 🎵 | Rich Presence |  Integrates with Discord's rich presence feature to display the current song information.                                      |
| 🔀 | Random Playback |  The bot offers a random song playback mode for a more spontaneous music experience.                                          |
| 🔔 | Now Playing Notifications | The bot provides "Now Playing" notifications to keep users informed about the music selection.                                 |

## 📂 Structure

```
discord-music-player-bot/
├── commands
│   ├── play.js
│   ├── skip.js
│   ├── stop.js
│   ├── queue.js
│   ├── join.js
│   ├── leave.js
│   ├── volume.js
│   ├── nowPlaying.js
│   ├── loop.js
│   ├── shuffle.js
│   ├── remove.js
│   └── help.js
├── events
│   ├── messageCreate.js
│   ├── ready.js
│   ├── voiceStateUpdate.js
│   └── interactionCreate.js
├── services
│   ├── musicService.js
│   ├── queueService.js
│   ├── playlistService.js
│   └── youtubeService.js
├── models
│   ├── user.js
│   ├── playlist.js
│   └── song.js
├── utils
│   ├── commandHandler.js
│   ├── logger.js
│   ├── errorHandler.js
│   └── helpers.js
├── config
│   ├── env.config.js
│   └── database.config.js
├── .env
├── package.json
└── README.md
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- MongoDB

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/discord-music-player-bot.git`
2. Navigate to the project directory:
   - `cd discord-music-player-bot`
3. Install dependencies:
   - `npm install`
4. Set up MongoDB:
   - Install MongoDB locally or use a cloud-based MongoDB service.
   - Create a database for the bot.
5. Configure environment variables:
   - Create a `.env` file in the project root.
   - Add the following environment variables:
     - `DISCORD_BOT_TOKEN`: Your Discord bot token.
     - `MONGODB_URI`: Your MongoDB connection string.
   - You can find your Discord bot token in the Discord developer portal.
   - Refer to your MongoDB provider's documentation for obtaining the connection string.

## 🏗️ Usage
### 🏃‍♂️ Running the Project
1. Start the bot:
   - `node index.js`

### ⚙️ Configuration
- Adjust the bot's configuration in `config.js` or by modifying the environment variables in `.env`.
- You can customize the bot's behavior by adjusting the prefixes, commands, and other settings in the configuration files.

### 📚 Examples
- `/play [song name/URL]`: Play a song from YouTube, Spotify, or SoundCloud.
- `/skip`: Skip the current song.
- `/stop`: Stop playback and clear the queue.
- `/queue`: View the current playlist queue.
- `/join`: Make the bot join your voice channel.
- `/leave`: Make the bot leave the voice channel.
- `/volume [number]`: Adjust the bot's volume (0-100).
- `/nowplaying`: Get information about the currently playing song.
- `/loop`: Toggle song or queue looping.
- `/shuffle`: Shuffle the queue.
- `/remove [song number]`: Remove a song from the queue.
- `/help`: View a list of available commands.

## 🌐 Hosting
### 🚀 Deployment Instructions
1. Deploy to a server with Node.js support (e.g., Heroku, AWS, Google Cloud).
2. Make sure MongoDB is accessible from the server.
3. Configure environment variables on the server.
4. Start the bot on the server.

## 📄 License
This project is licensed under the MIT License.

## 👏 Authors
- Author Name - [Spectra.codes](https://spectra.codes)
- Creator Name - [DRIX10](https://github.com/Drix10)

  <p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>