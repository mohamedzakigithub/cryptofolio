var express = require("express");
var router = express.Router();

var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  data = db.Post.findAll();
  res.send(data);
  //res.render("index", hbsObject);
});

// Export routes for server.js to use.
module.exports = router;
