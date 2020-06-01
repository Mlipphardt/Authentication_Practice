const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");

app.set("view engine", "ejs");

// middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
session({ secret: "some secret", resave: false, saveUninitialized: true });

const app = express();

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/profile", function (req, res) {
  res.render("profile");
});

app.listen(3000, function () {
  console.log("The server is alive and listening!");
});
