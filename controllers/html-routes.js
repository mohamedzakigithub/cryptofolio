var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    var hbsObject = {
      user: req.user,
    };
    res.render("index", hbsObject);
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/");
    }
    const hbsObject = {
      user: req.user,
    };
    res.render("login", hbsObject);
  });

  app.get("/addpost", isAuthenticated, function (req, res) {
    const hbsObject = {
      user: req.user,
    };
    res.render("addpost", hbsObject);
  });

  app.get("/cms", isAuthenticated, function (req, res) {
    const hbsObject = {
      user: req.user,
    };
    res.render("cms", hbsObject);
  });
};
