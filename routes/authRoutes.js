const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'User registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post("/verify",(req,res)=>{
  const token = req.headers.token
  if(!token){
      res.status(401).json({valid:false})
  }

  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
          if(err){
              res.status(401).json({valid:false})
          }
          else{
              res.json({valid:true,user:decoded})
          }
  })
  
})


router.post('/check-email', async (req, res) => {
  const { email } = req.body

  try {
    const userExists = await User.findOne({ email })
    res.json({ exists: !!userExists })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})



module.exports = router;
