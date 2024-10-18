// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true,  trim: true },
//   email: { type: String, required: true, unique: true, trim: true },
//   password: { type: String, required: true },
//   profile: {
//     badges: { type: [String], default: [] },
//     progress: {
//       lessons: [{
//         lessonId: { type: String, required: true },
//         completed: { type: Boolean, default: false },
//         score: { type: Number, default: 0 }
//       }],
//       totalScore: { type: Number, default: 0 },
//       rank: { type: Number, default: 0 }
//     },
//     financialTips: { type: [String], default: [] }
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// userSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    badges: [String],
    progress: {
      lessons: [{
        lessonId: mongoose.Schema.Types.ObjectId,
        completed: Boolean,
        score: Number
      }],
      totalScore: Number,
      rank: Number
    },
    financialTips: [String]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

module.exports = mongoose.model('User', userSchema)
