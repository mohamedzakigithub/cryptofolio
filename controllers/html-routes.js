var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/addpost", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addpost.html"));
  });

  app.get("/cms", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });
};
