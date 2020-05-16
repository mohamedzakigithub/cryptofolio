var isAuthenticated = require("../config/middleware/isAuthenticated");
var exphbs = require("express-handlebars");

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
    var hbsObject = {
      user: req.user,
    };
    res.render("login", hbsObject);
  });

  app.get("/addpost", isAuthenticated, function (req, res) {
    var hbsObject = {
      user: req.user,
    };
    res.render("addpost", hbsObject);
  });

  app.get("/cms", isAuthenticated, function (req, res) {
    var hbsObject = {
      user: req.user,
    };
    res.render("cms", hbsObject);
  });
};
