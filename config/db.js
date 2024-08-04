const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

module.exports = connectDB;
