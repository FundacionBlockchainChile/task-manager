const mongoose = require("mongoose");
// const validator = require("validator");

// TASKS MODEL AND SAVE A TASK TO DATABASE VIA MONGOOSE ***********************
const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },{
    timestamps: true
  })

// TASK MODEL AND SAVE A TASK TO DATABASE VIA MONGOOSE ***********************
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;