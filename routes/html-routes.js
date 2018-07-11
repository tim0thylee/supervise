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

 

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
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


