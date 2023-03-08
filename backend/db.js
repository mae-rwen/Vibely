const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    throw error;
  }
};

mongoose.connect(process.env.CONNECTION_STRING);
