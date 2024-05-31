const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
async function addUser(payload) {
  const oldUser = await User.findOne({ email: payload?.email });
  if (oldUser) throw new Error("Email taken");
  const hashPwd = await bcrypt.hash(payload?.password, 10);
  payload.password = hashPwd;
  const user = new User(payload);
  return await user.save();
}
async function getUser(payload) {
  const user = await User.findOne({ email: payload?.email });
  if (!user) throw new Error("Invalid email address");
  const match = bcrypt.compare(payload?.password, user.password);
  if (!match) throw new Error("Invalid password");
  const accessToken = jwt.sign(
    {
      user: { email: user.email, id: user?._id },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3h",
    }
  );

  return {
    user: { email: user.email, id: user?._id },
    accessToken,
  };
}
module.exports = {
  addUser,
  getUser,
};
