var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/api/posts", async function (req, res) {
    try {
      const result = await db.Post.findAll({
        order: [["updatedAt", "DESC"]],
        include: [db.User],
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Get posts failed!");
    }
  });

  app.post("/api/posts", isAuthenticated, async function (req, res) {
    try {
      const result = await db.Post.create(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Add post failed!");
    }
  });

  app.delete("/api/posts/:id", isAuthenticated, async function (req, res) {
    try {
      const result = await db.Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Delete post failed!");
    }
  });

  app.put("/api/posts", isAuthenticated, async function (req, res) {
    try {
      const result = await db.Post.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Edit post failed!");
    }
  });
};
