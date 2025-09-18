const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    complete: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task',taskSchema)

module.exports = Task