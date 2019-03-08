// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  // Route to get existing users
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/users.html"));
  });

  // Route to get new user form
  app.get("/users/new", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/new-user.html"));
  });

  // Route to get drug name form
  app.get("/drug/new", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/new-drug.html"));
  });

  // Route to get interaction results
  app.get("/drug/interaction-results", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/interaction-results.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
