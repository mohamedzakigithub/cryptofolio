var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", async function (req, res) {
    try {
      const result = await db.User.create(
        ({ name, email, password } = req.body)
      );
      res.redirect(307, "/api/login");
    } catch (error) {
      console.log(error);
      res.status(500).send("Signup failed!");
    }
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
