const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: 
  {
    type: Boolean,
    default: false
  },
  registrationToken:
  {
    type: String,
    expires: 4320
  }
});

module.exports = User = mongoose.model("user", UserSchema);
