const User = require('../models/userModel')

// Middleware for verifying JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ message: 'Access denied' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' })
  }
}

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json({
      username: user.username,
      badges: user.profile.badges,
      progress: user.profile.progress,
      financialTips: user.profile.financialTips
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update user profile (new quiz result or badge)
exports.updateProfile = async (req, res) => {
  const { badges, progress } = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { 'profile.badges': badges, 'profile.progress': progress }},
      { new: true }
    )
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  const { filter } = req.query // 'daily', 'weekly', 'all-time'
  try {
    const users = await User.find({}).sort({ [`profile.progress.${filter}Score`]: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Assign badges
exports.assignBadge = async (req, res) => {
  const { badge } = req.body
  try {
    const user = await User.findById(req.user._id)
    user.profile.badges.push(badge)
    await user.save()
    res.json({ message: 'Badge assigned successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
