const mongoose = require("mongoose");
const con = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCN);
  } catch (error) {
    console.log(error);
  }
};
module.exports = con;
