var express = require("express");
var routes = require("./controllers/router.js");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
