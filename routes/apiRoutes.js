// Require data model
var db = require("../models");

// Require Express
const express = require('express');
const unirest = require('unirest');

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

        /**** WE NEED TO USE THE DATA IN THIS ARRAY TO POPULATE DROP DOWN ****/
        console.log(emailArr);
        /**** USE TEST.PUG TO SEND DATA TO BROWSER (AS TEST ONLY REPLACE WITH ALLIE'S PAGE) ****/
        res.render('test', {emails: emailArr});
      }); // end promise
    }); // end get users email

    /*************************************************** */

    /* 'USERS' PAGE: GET SAVED DRUGS FROM DB */
    app.get("/savedDrugs/:user", function(req, res){
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
          // api call to get drug name, return data to calling form
          var results1;
          unirest.get("https://iterar-mapi-us.p.rapidapi.com/api/autocomplete?query="+req.body.searchString1).header("X-RapidAPI-Key", "0xAyFD96WlmshBNnpLcUfgSrWzCvp15QZAnjsnwA8grd2AfWRB").end(function (results) {
              //results1 = JSON.stringify(results.body);
              for (var i = 0; i < results.body.suggestions.length; i++) {
                results1 += results.body.suggestions[i] + ' || '
            }
              res.render('new-drug',{drugnames1 : results1})
          });
    }); 

    app.post("/api/interaction", function(req, res) {
      // 1. save drug combo to db
      // 2. api call to get drug interaction, return data to calling form
      /**** ERIK'S CODE HERE ****/
      
  });

  /*************************************************** */


    /* TEST ROUTE FOR DRUG SEQUELIZE - APP DOES NOT USE THIS ROUTE */
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