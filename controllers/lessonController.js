const Lesson = require('../models/lessonModel')

// Get all lessons
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({})
    res.json(Lessons)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get specific lesson
exports.getLessonById = async (req, res) => {
  const { id } = req.params
  try {
    const lesson = await Lesson.findById(id)
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' })
    res.json(lesson)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Submit quiz results for a lesson
exports.submitQuiz = async (req, res) => {
  const { id } = req.params
  const { score } = req.body
  try {
    // Process quiz results and update user progress
    const lesson = await Lesson.findById(id)
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' })

    // Here you would update the user's progress based on the quiz score
    // ...

    res.json({ message: 'Quiz results submitted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
