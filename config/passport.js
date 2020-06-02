const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(
  "local-signup",
  new LocalStrategy({ usernameField: "email" }, function (
    req,
    email,
    password,
    done
  ) {
    db.User.findOne({ where: { email: email } }).then(function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: "Email is already in use." });
      }
      db.User.create({
        nickname: req.body.nickname,
        email: email,
        password: password,
      }).then(function (dbUser) {
        return done(null, dbUser);
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(err, user);
});

module.exports = passport;
