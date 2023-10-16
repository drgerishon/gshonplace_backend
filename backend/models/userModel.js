const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      default: 'https://res.cloudinary.com/dlionndxl/image/upload/v1682920675/avatar_wru8b1.avif',
    },
    role: {
      type: String,
      require: [true],
      default: "customer",
      enum: ["customer", "admin"]
    },
    phone: {
      type: String,
      default: '+254',
    },
    address: {
      type: Object,
      default: {
        address: '01101',
        state: 'Nairobi',
        country: 'Kenya',
      },
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // Encrypt password
  const salt = await bcrypt.genSalt(10); // Reduced salt rounds to 10
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
