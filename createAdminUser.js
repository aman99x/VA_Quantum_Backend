const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path as needed
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const createAdminUser = async () => {
    const email = 'admin@example.com'; // Set your admin email
    const password = 'adminpassword'; // Set your admin password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
        email,
        password: hashedPassword,
        role: 'admin'
    });

    try {
        await newUser.save();
        console.log('Admin user created successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.connection.close();
    }
};

createAdminUser();
