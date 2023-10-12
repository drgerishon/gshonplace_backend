const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, photo, phone, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password should not be less than 6 characters' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already used' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10); // Reduced salt rounds to 10
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
      phone,
      bio,
    });

    if (user) {
      const { name, email, photo, phone, bio } = user;
      res.status(200).json({
        status: 'User created',
        name,
        email,
        photo,
        phone,
        bio,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'Failed to create a user',
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
