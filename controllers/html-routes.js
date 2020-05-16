var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var exphbs = require("express-handlebars");

module.exports = function (app) {
  app.get("/", function (req, res) {
    var hbsObject = {
      user: req.user,
    };
    res.render("index", hbsObject);
    //res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/");
    }
    var hbsObject = {
      user: req.user,
    };
    res.render("login", hbsObject);
    //res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/addpost", isAuthenticated, function (req, res) {
    var hbsObject = {
      user: req.user,
    };
    res.render("addpost", hbsObject);
    //res.sendFile(path.join(__dirname, "../public/addpost.html"));
  });

  app.get("/cms", isAuthenticated, function (req, res) {
    var hbsObject = {
      user: req.user,
    };
    res.render("cms", hbsObject);
    //res.sendFile(path.join(__dirname, "../public/cms.html"));
  });
};
