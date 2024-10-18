const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel') // Assuming user model is defined elsewhere

// Register new users
exports.register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    // Save user in the database
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login existing users
exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' })

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.header('auth-token', token).json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
