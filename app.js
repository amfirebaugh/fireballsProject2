// Dependencies
require("dotenv").config();
var express = require("express");

var path = require('path');

var db = require("./models");

// Sets up Express app
var app = express();

// Defines PORT
var PORT = process.env.PORT || 3000;

// Middleware

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sets static content folder
app.use(express.static("public"));

// Sets the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routes
require("./routes/apiRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
