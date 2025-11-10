const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

connectDB(process.env.MONGO_URI);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.get('/', async (req, res) => {
  const Student = require('./models/student'); 
  const students = await Student.find({});
  res.render('index', { students }); 
});

app.get('/api/students', async (req, res) => {
  try {
    const Student = require('./models/student');
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = app;
