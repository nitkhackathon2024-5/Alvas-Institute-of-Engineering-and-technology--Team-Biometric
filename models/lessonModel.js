// const mongoose = require('mongoose');

// const lessonSchema = new mongoose.Schema({
//   title: { type: String, required: true, trim: true },
//   category: { type: String, enum: ['budgeting', 'saving', 'credit', 'investing'], required: true },
//   content: { type: String, required: true },
//   quiz: [{
//     question: { type: String, required: true },
//     options: { type: [String], required: true },
//     answer: { type: String, required: true }
//   }],
//   simulation: {
//     type: { type: String, required: true },
//     data: { type: Object, required: true }
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// lessonSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model('Lesson', lessonSchema);

// models/Lesson.js
// const mongoose = require('mongoose')

// const lessonSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// })

// module.exports = mongoose.model('Lesson', lessonSchema)

const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  quiz: [{
    question: String,
    options: [String],
    answer: String
  }],
  simulation: {
    type: String,
    data: Object
  }
})

module.exports = mongoose.model('Lesson', lessonSchema)
