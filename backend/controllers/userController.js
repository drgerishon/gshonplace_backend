const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendMail = require('../utils/sendMail')

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
          _id: user._id,
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

   if(user) {
    const {_id, name, email, photo,role, phone,address, bio} = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      role,
      phone,
      address,
      bio
    })
   }else{
 res.status(400)
 throw new Error('User not Found')
   }
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
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const { name, phone, address } = req.body;

      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.address = address || user.address;

      const updatedUser = await user.save();

      return res.status(200).json({
        status: 'user updated successfully',
        name: updatedUser.name,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        address: updatedUser.address,
        bio: updatedUser.bio,
      });
    } else {
      res.status(404);
      throw new Error('user not found');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not found, please sign up' });
    }

    if (!oldPassword || !password) {
      return res
        .status(400)
        .json({ message: 'Please enter old and new password' });
    }

    // Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if (passwordIsCorrect) {
      user.password = password;
      await user.save();
      return res.status(200).json({
        status: 'Password change successful',
      });
    } else {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Changing password failed',
      error: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('user does not exists');
  }

  //delete token if already exists and create a fresh one

  let token = await Token.findOne({userId: user._id})
  if(token) {
    await token.deleteOne()
  }

  //create token
  let resetToken = crypto.randomBytes(32).toString('hex') + user._id;

  //hash token before saving to db using crypto

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //save it to db, sent to frontend together with link in the email to reset password
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // add 30 minutes from now
  }).save();

  //construct reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  //reset email

  const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the link below to reset your password</p>
    <p>This reset link is valid for 30 minutes</p>

    <a href=${resetUrl} clicktracking =off>${resetUrl}</a>

    <P>Regards</P>
    <P>GshonPlace Team</P>

    `;
  const subject = 'Password Reset Request';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendMail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: 'resent email sent' });
  } catch (error) {
    console.log('Original Error:', error);
    res.status(500);
    throw new Error('Email not sent. Try again');
  }
};

const resetpassword = async (req, res) => {
  const { password} = req.body
  const {resetToken} = req.params

  //hash token then compare to one in the database
  const hashedToken = crypto
  .createHash('sha256')
  .update(resetToken).digest('hex')

  //find token in db
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {$gt: Date.now()} //if expired
   })

   if(!userToken) {
    res.status(404)
    throw new Error("invalid or expired Token")
   }

   //find user

   const user = await User.findOne({_id: userToken.userId})
   user.password = password
   await user.save(
    res.status(200).json({
      message: "passord reset successful. please login"
    })
   )

}
//upadate photo
const updatePhoto = async (req, res) => {
  const { photo } = req.body

  const user = await User.findById(req.user._id)
  user.photo = photo
  const updatedUser = await user.save()
  res.status(200).json(updatedUser) //sern user to frontend
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgetPassword,
  resetpassword,
  updatePhoto
};
