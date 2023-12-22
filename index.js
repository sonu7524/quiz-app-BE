const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const quizStatus = require('./routes/status');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', quizRoutes);

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => {
  res.send('Quiz App Server!')
})