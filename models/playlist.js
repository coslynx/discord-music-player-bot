import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

export default Playlist;