const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();
// const db = config.get("mongoURI");
const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected.....");
  } catch (err) {
    console.error(err.message);
    process.exit(1); //Exit process with failure
  }
};

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(db);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

module.exports = connectDB;
