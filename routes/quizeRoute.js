const express = require('express')
const Quiz = require('../models/Quiz')

const router = express.Router()

router.post('/add', async (req, res) => {
  const { lessonId } = req.params
  const { userId, score } = req.body
  try {
    const quiz = new Quiz({ userId, lessonId, score })
    await quiz.save()
    res.status(201).json({ message: 'Quiz submitted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error submitting quiz', error: err })
  }
})

module.exports = router
