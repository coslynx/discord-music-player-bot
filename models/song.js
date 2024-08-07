import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  stream: {
    type: Object,
    required: true,
  },
  service: {
    type: String,
    enum: ['youtube', 'spotify', 'soundcloud'],
    required: true,
  },
});

const Song = mongoose.model('Song', SongSchema);

export default Song;