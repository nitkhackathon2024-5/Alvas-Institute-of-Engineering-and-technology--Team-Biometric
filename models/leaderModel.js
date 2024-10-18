const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  scoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Score', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

leaderboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
