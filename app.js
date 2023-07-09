const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const port = 7000;

var connectionUrl = "mongodb://localhost:27017/aman";

mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Connected");
  }
);

const feedSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  feedback__text: String,
});

const Feedback = mongoose.model("Feedback", feedSchema);

app.use(express.static(__dirname));
app.use(express.urlencoded());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/feedback", (req, res) => {
  const SaveUser = new Feedback(req.body);
  SaveUser.save((error, savedUser) => {
    if (error) throw error;
    res.json(savedUser);
  });
});

app.listen(port, () => {
  console.log("listening to port 7000");
});
