// Require data model
var db = require("../models");

// Require Express
const express = require('express');
const unirest = require('unirest');
const axios = require('axios');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    
    // ==========================================================================
    //  GET ROUTES
    // ==========================================================================

    /* HOME ROUTE */
    app.get("/", function(req, res) {
      res.render('home');
    });
    
    app.get("/users/new", function(req, res) {
      res.render('new-user');
    });

    app.get("/drug/new", function(req, res) {
      res.render("new-drug");
    });
    
    /* 'DRUG/NEW' PAGE & 'USERS' PAGE:  GET EMAIL FROM USERS TABLE FOR DROPDOWN  */
    app.get("/users", function(req, res) {
      db.User.findAll({
        // this WORKS!
        attributes : ['email']})
        
        .then( results => {
        var emailArr = [];
        // loop through and get emails for each user
        for (var i = 0; i < results.length; i++) { 
          for (key in results[i].dataValues) {
            // pass to array
           emailArr.push(results[i].dataValues[key]);
          } // end inner for
        } // end outer for

        // console.log(emailArr);
        // send back to page in order to render email drop down
        res.json(emailArr);
      }); // end promise
    }); // end get users email

    /*************************************************** */

    /* 'USERS' PAGE: GET SAVED DRUGS FROM DB */
    app.get("/savedDrugs", function(req, res){
      var emailAddr = 'solo@falcon.com';
      db.User.findAll({
        // find all drugs associated with user
        include: [ db.Drug ],
        /**** THE VALUE FOR EMAIL MUST BE PASSED IN BY REFERENCE ****/
        where: {email: emailAddr}})
        
        .then( results => {
        var drugArr = [];
        for (var i = 0; i < results.length; i++) { 
          for (var j = 0; j < results[i].dataValues.Drugs.length; j++) {
            for (key in results[i].dataValues.Drugs[j].dataValues) {
              if (key.includes('drugname')){
                  //console.log(results[i].dataValues.Drugs[j].dataValues[key]);
                  // pass to array
                  drugArr.push(results[i].dataValues.Drugs[j].dataValues[key]);
              } // end if 
            } // end inner for
          } // end middle for
          
          /**** WE NEED TO USE THE DATA IN THIS ARRAY TO POPULATE THE MEDICATONS DROPDOWN ****/
          console.log(drugArr);
          /**** USE TEST.PUG TO SEND DATA TO BROWSER (AS TEST ONLY, REPLACE WITH ALLIES PAGE) ****/
          res.render('test', {emails: drugArr});
        } // end outer for
      }); // end promise
    }); // end get saved drugs

    // ==========================================================================
    // POST ROUTES
    // ==========================================================================
    
    /* ADD NEW USER ROUTE */
    // use body-parser via express to access form data
    app.post("/users/new", function(req, res) {
        
        // insert new user into Users table
        db.User.create({email: req.body.userEmail, firstname: req.body.userFirstName, lastname: req.body.userLastName, age: req.body.userAge, sex: req.body.userSex}).then(function(){
          // redirect to next page in the flow
          res.redirect("/drug/new");
        });    
      });

    /* API CALLS */
    app.post("/api/getDrug", function(req, res) {
          //console.log(req.body.name);
          // api call to get drug name, pass in req.body object (specifically the value of 'name' key) into API call
           var results1 = '';
           unirest.get("https://iterar-mapi-us.p.rapidapi.com/api/autocomplete?query="+req.body.name).header("X-RapidAPI-Key", "0xAyFD96WlmshBNnpLcUfgSrWzCvp15QZAnjsnwA8grd2AfWRB").end(function (results) {
              //results1 = JSON.stringify(results.body);
              for (var i = 0; i < results.body.suggestions.length; i++) {
                  results1 += results.body.suggestions[i] + ' || '
              }
              // send result back to new drug page
              res.send(results1);
          });
    }); 

    app.post("/api/interaction", function(req, res) {
      // save drug combo to db
      // sequelize does not need to have an explicit join as does SQL.  Tested with invalid email and constraint was enforced.
      db.Drug.create({drugname1: req.body.name1, drugname2: req.body.name2, UserEmail:req.body.email});
      // api call to get drug interaction, return data to calling form
      console.log('in api interaction', req.body);
      var queryUrl = "https://www.ehealthme.com/api/v1/drug-interaction/" + req.body.name1 + "/" + req.body.name2 + "/";
      axios.get(queryUrl).then(
        function(response) {
        try {
          // response tested as functional using 'zoloft' and 'acetaminophen'
          console.log(response);
        }
          catch(err) {
            console.log(err);
          }
        });
  });

  // ==========================================================================
  // TEST ROUTE UNUSED BY APP
  // ==========================================================================
  
  


    /* TEST ROUTE FOR DRUG SEQUELIZE - APP DOES NOT USE THIS ROUTE */
    app.get("/db/test", function(req, res) { 
        res.send('testing db, see node console!')

        // *** VIA USERS TABLE, FIND ALL DRUGS FOR USER WHERE EMAIL ... **/
        db.User.findAll({
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