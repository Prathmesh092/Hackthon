const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const loginLimiter = require('./middleware/limiter'); // ✅ only here
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');



dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(mongoSanitize());
// Middleware
app.use(cors()); 
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vijaymundargi:vijay%40123@cluster0.torpdu7.mongodb.net/e_secure?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Apply rate limiter ONLY to login route
app.use('/api/login', loginLimiter); // ✅ Apply limiter BEFORE login route
app.use('/api/login', require('./routes/login'));

app.use('/api/signup', require('./routes/signup'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/patient', require('./routes/patient'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Management System API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
