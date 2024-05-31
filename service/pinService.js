const pins = require("../models/pins");

async function addPin(req) {
  const pin = new pins(req.body);
  return await pin.save();
}
async function getPins() {
  return await pins.find();
}

module.exports = {
  addPin,
  getPins,
};
