const express = require('express');
const Lesson = require('../models/lessonModel');

const router = express.Router();

// Get all lessons
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.findOne();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});


// Submit quiz results
router.post('/:id/quiz', async (req, res) => {
  const { score } = req.body;

  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from auth middleware
    const scoreEntry = await Score.findOne({ userId });
    scoreEntry.allTimeScore += score;
    await scoreEntry.save();
    res.json({ message: 'Quiz results submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz results' });
  }
}); 

module.exports = router;
