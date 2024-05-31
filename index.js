const express = require("express");
const { default: mongoose } = require("mongoose");
const { getPins, addPin } = require("./service/pinService");
const cors = require("cors");
const con = require("./mongooseCon");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const { addUser, getUser } = require("./service/userService");
const verifyToken = require("./middleware/verifyToken");
const jsonParser = bodyParser.json();
con();
app.use(cors());
app.post("/api/login", jsonParser, async (req, res) => {
  try {
    const resp = await getUser(req.body);
    return res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});
app.post("/api/user", jsonParser, async (req, res) => {
  try {
    const resp = await addUser(req.body);
    return res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

app.use(verifyToken);
app.get("/api/pin", async (req, res) => {
  try {
    const resp = await getPins();
    return res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});
app.post("/api/pin", jsonParser, async (req, res) => {
  try {
    const resp = await addPin(req);
    return res.status(201).send(resp);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

app.post("/api/user/login", async (req, res) => {
  try {
    const resp = await user(req);
    return res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

mongoose.connection.once("open", () => {
  console.log("mongo connected succesfully..");
  app.listen(8080, () => {
    console.log("server live.....");
  });
});
