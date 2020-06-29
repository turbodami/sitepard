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
<<<<<<< HEAD
  verified: 
  {
    type: Boolean,
    default: false
  }
  //stripeCustomerId: {
  //type: String,
  //unique: true
  //}
=======
  verified:
  {
    type: Boolean,
    default: false
  },
  stripeCustomerId:
   {

  }
>>>>>>> mail
});

module.exports = User = mongoose.model("user", UserSchema);
