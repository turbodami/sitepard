const mongoose = require("mongoose");
const config = require("../nodemon.json");
const db = process.env.MONGO_DEV_URI;
const connectDB = async () => {
  console.log(db);
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("mongo connected!");
  } catch (err) {
    console.error(err.message);

    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
