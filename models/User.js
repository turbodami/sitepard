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
  }
  //stripeCustomerId: {
  //type: String,
  //unique: true
  //}
});

module.exports = User = mongoose.model("user", UserSchema);
