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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: 
  {
    type: Boolean,
    default: true
  },
  registrationToken:
  {
    type: String,
    expires: 4320
  },
  passwordResetToken:
  {
    type: String,
    expires: 4320
  }
});

module.exports = User = mongoose.model("user", UserSchema);
