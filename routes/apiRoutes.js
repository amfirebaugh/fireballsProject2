// Require data model
var db = require("../models");

// Require Express
const express = require('express');

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

    app.get("/db/test", function(req, res) { 
        res.send('testing db, see node console!')

        // *** VIA USERS TABLE, FIND ALL DRUGS FOR USER WHERE EMAIL ... **/
        db.User.findAll({
        // this WORKS!
        // find all drugs associated with user
        include: [ db.Drug ],
        // this where points to User
        where: {email: 'solo@falcon.com'},
        
        }).then( results => {

        /* log firstname lastname */
        // console.log(results[0].dataValues.firstname, results[0].dataValues.lastname,);

        /* log the first 2 drug combos for solo*/
        // console.log(results[0].dataValues.Drugs[0].dataValues.drugname1, results[0].dataValues.Drugs[0].dataValues.drugname2);
        // console.log(results[0].dataValues.Drugs[1].dataValues.drugname1, results[0].dataValues.Drugs[1].dataValues.drugname2);


        /* log all drug combos for solo */
        var drugArr = [];
        for (var i = 0; i < results.length; i++) { 
          for (var j = 0; j < results[i].dataValues.Drugs.length; j++) {
            for (key in results[i].dataValues.Drugs[j].dataValues) {
              if (key.includes('drugname')){
                  //console.log(results[i].dataValues.Drugs[j].dataValues[key]);
                  // pass to array
                  drugArr.push(results[i].dataValues.Drugs[j].dataValues[key]);
              }   
            }
          }
          console.log(drugArr);
          res.send(drugArr)
        }
      });
    });

  };