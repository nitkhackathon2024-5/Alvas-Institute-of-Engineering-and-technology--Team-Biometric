const express = require('express');
const User = require('../models/userModel');
const Score = require('../models/score');

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from auth middleware
    const user = await User.findById(userId).populate('profile.progress.lessons.lessonId');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const { lessons } = req.body; // lessons should contain lessonId, completed, and score

  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from auth middleware
    const user = await User.findById(userId);
    user.profile.progress.lessons = lessons;
    user.profile.progress.totalScore = lessons.reduce((total, lesson) => total + lesson.score, 0);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Score.find()
      .sort({ allTimeScore: -1 }) // Sort by all-time score descending
      .populate('userId', 'username') // Optionally populate user details
      .limit(10); // Limit to top 10 users
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Assign badge
router.post('/badge', async (req, res) => {
  const { badge } = req.body;

  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from auth middleware
    const user = await User.findById(userId);
    if (!user.profile.badges.includes(badge)) {
      user.profile.badges.push(badge);
      await user.save();
    }
    res.json(user.profile.badges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign badge' });
  }
});

module.exports = router;
