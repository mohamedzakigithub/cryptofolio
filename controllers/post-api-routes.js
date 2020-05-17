var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/api/posts", function (req, res) {
    db.Post.findAll({
      order: [["updatedAt", "DESC"]],
      include: [db.User],
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/posts", isAuthenticated, function (req, res) {
    console.log(req.body);
    db.Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/posts/:id", isAuthenticated, function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

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
