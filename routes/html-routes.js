// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// var authController = require("../contollers/authcontrollers.js")
// Routes
// =============================================================
module.exports = function(app) {

//  mysql://bd5aff4807d4b7:c8bef019@us-cdbr-iron-east-05.cleardb.net/heroku_e21df1c92404d08?reconnect=true

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

  app.get("/sale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

  app.get("/customer", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer.html"));
  });

  
  app.get("/employee", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employee.html"));
  });

  
  app.get("/inventory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/inventory.html"));
  });

  
  app.get("/sale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

};


