const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected successfully !");
    })
    .catch((err) => {
      console.log("Database connection failed ", err);
    });
};

module.exports = databaseConnection;
