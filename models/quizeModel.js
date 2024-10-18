const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  score: Number
})

module.exports = mongoose.model('Quiz', quizSchema)
