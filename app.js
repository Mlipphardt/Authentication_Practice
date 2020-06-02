const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passort.js");

const app = express();
app.set("view engine", "ejs");

// middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
session({ secret: "some secret", resave: false, saveUninitialized: true });
app.use(passport.initialize());
app.use(passport.session());

//routes

app.get("/login", function (req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
  })
);

app.get("/profile", function (req, res) {
  res.render("profile");
});

app.listen(3000, function () {
  console.log("The server is alive and listening!");
});
