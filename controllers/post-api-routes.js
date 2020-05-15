var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // GET route for getting all of the posts
  app.get("/api/posts", function (req, res) {
    db.Post.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", isAuthenticated, function (req, res) {
    console.log(req.body);
    db.Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", isAuthenticated, function (req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
};
