import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
  }],
});

const User = mongoose.model('User', UserSchema);

export default User;