require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb+srv://vijaymundargi:vijay%40123@cluster0.torpdu7.mongodb.net/e_secure?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

async function createAdmin() {
  const admin = new Admin({
    firstName: "vijay",
    lastName: "mundargi",
    email: "vijaymundargi@gmail.com",
    password: "admin@123", 
    role: "admin"
  });

  try {
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
