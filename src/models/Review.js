const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Please add a rating']
  },
  userName: {
    type: String,
    required: [true, 'Username required']
  },
  userId: {
    type: String,
    required: [true, 'Username required']
  },
  movieTitle: {
    type: String,
    required: [true, "Movie name required"]
  },
  movieId: {
    type: String,
    required: [true, "Movie Id required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
