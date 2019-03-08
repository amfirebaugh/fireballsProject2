// Require data model
var db = require("../models");

// Dependencies
const express = require('express');

// Create express router object
const router = express.Router();

var userData = require("../data/user-data");
var drugData = require("../data/drug-data");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // ---------------------------------------------------------------------------
  
    app.get("/api/users", function(req, res) {
      res.json(userData);
    });
  
    app.get("/api/drug", function(req, res) {
      res.json(drugData);
    });
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------
  
    app.post("/api/users", function(req, res) {
        userData.push(req.body);
        res.json();
    });

    app.post("/api/drugs", function(req, res) {
          drugData.push(req.body);
          res.json();
      });
}