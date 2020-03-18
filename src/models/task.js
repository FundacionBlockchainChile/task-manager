const mongoose = require("mongoose");
const validator = require("validator");

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


  module.exports = Task