const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    (useNewUrlParser = true), (useCreateIndex = true);
    console.log("database is connected");
  } catch (err) {
    console.log("databse is not connected", err);
  }
};

module.exports = connectDB;
