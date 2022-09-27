const mongoose = require("mongoose");

const connectDB = async () => {
  // all mongoose methods are asynchronous
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;