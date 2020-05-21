var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");

var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

require("./controllers/html-routes.js")(app);
require("./controllers/user-api-routes.js")(app);
require("./controllers/post-api-routes.js")(app);

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
