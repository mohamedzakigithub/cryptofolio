var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create(({ name, email, password } = req.body))
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).send("Signup failed!");
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json(({ id, name, email } = req.user));
    }
  });
};
