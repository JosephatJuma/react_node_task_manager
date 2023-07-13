const mongoose = require("mongoose");
const Register = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("user", Register);
