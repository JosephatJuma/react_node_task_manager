const mongoose = require("mongoose");
const Task = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  due_date: { type: Date },
  due_time: { type: String },
  user_id: { type: String },
  status: { type: String },
  color: { type: String },
  label: { type: String },
  priority: { type: Number },
});

module.exports = mongoose.model("task", Task);
