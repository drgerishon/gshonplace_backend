const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, photo, phone, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password should not be less than 6 characters' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already used' });
    }

    const user = await User.create({
      name,
      email,
      password,
      photo,
      phone,
      bio,
    });

    //generate token

    const token = generateToken(user._id);

    //send http-only cookie

    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //one day
      sameSite: 'none',
      secure: true,
    });

    if (user) {
      res.status(200).json({
        status: 'User created',
        data: {
            _id,
          name,
          email,
          token,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'Failed to create a user',
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('please add email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error('user not found. please sign up');
    }
    //check password
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //generate token

    const token = generateToken(user._id);

    //send http-only cookie

    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //one day
      sameSite: 'none',
      secure: true,
    });

    if (user && passwordIsCorrect) {
      const { name, email } = user;
      res.status(200).json({
        status: 'login succesful',
        data: {
          name,
          email,
          token,
        },
      });
    } else {
      return res.status(400).json({
        status: 'Invalid email or password',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error occured',
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0), //set to zero to expire the cookie
    sameSite: 'none',
    secure: true,
  });
  return res.status(200).json({
    message: 'successfully logged out',
  });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error('error occured');
  }
};
const loginStatus = async (req, res) => {
  const token = req.cookies.token; // get token from cookies
  if (!token) {
    return res.json(false);
  }
  //it it exists then verify
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;

    user.name = req.body.name || name;
    user.email = email;
    user.photo = req.body.photo || photo;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();

    res.status(200).json({
        status: "user updated successfully",
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
    })
  } else {
    res.status(404);
    throw new Error('user not found');
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
};
