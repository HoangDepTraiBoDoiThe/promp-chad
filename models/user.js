const mongoose = require("mongoose"); // Erase if already required

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    unique: [true, "Email is already exit."],
    required: [true, "Email is already exit."],
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
