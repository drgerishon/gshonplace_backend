const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email required'],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'password required'],
      minLength: [6, 'password must be more the 6 charactars'],
      // maxLength: [50, 'password must not exceed 23 charactars'],
    },
    photo: {
      type: String,
      required: [false, 'please add a photo'],
      default: 'https://ibb.co/tMVd1nt',
    },
    phone: {
      type: String,
      default: '+254',
    },

    bio: {
      type: String,
      maxLength: [250, 'bio must not exceed 250 charactars'],
      default: 'bio',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
