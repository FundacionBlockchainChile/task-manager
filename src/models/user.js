const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot include "password" word');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      require: true
    }
  }]
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  
  user.tokens = user.tokens.concat({ token })

  await user.save()
  
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("No User found. Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// HASH THE PLAIN TEXT PASSWORD BEFORE SAVING
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isDirectModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// USERS MODEL AND SAVE AN USER TO DATABASE VIA MONGOOSE ***********************
const User = mongoose.model("users", userSchema);

module.exports = User;