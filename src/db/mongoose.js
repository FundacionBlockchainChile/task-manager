const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

// TASKS MODEL AND SAVE A TASK TO DATABASE VIA MONGOOSE ***********************
// Tasks Models
const Task = mongoose.model("Tasks", {
  name: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// New Task
const task = new Task({
  name: "        Study              ",
  completed: true
});

// Save task to database
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log(error);
  });

// USERS MODEL AND SAVE AN USER TO DATABASE VIA MONGOOSE ***********************
const User = mongoose.model("users", {
  name: {
    type: String,
    required: true,
    trim: true
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
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
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
  }
});

// const me = new User({
//   name: "    Chapulin    ",
//   email: "CHAPU@gMAil.com    ",
//   password: "        123     ",
//   age: 10
// });

// me.save()
//   .then(me => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log("Error", error);
//   });
