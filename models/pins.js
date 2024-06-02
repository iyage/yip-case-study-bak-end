const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const PinSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Pin", PinSchema);
