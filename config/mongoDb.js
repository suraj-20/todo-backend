const mongoose = require("mongoose");

module.exports.connectMongoDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Error in mongoDb", error);
  }
};
