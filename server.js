const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../nitk-project/config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const authMiddleware = require('./middleware/auth');
const cors = require("cors")

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes); 
app.use('/lessons', lessonRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
