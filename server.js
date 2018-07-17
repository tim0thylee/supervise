// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var passport   = require('passport');
var session    = require('express-session');

var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var http = require('http');


let db = require('./models')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// //For Handlebars
app.set('views', './app/views');
app.engine('html', exphbs({extname: '.html'}));
app.set("view engine", "html");
app.set('view engine', '.html');

//Models
var models = require("./models");
var authRoute = require('./routes/auth.js')(app,passport);
require('./config/passport/passport.js')(passport, models.user);
// Routes
// =============================================================
require("./routes/sale-api-routes.js")(app);
require("./routes/inventory-api-routes.js")(app);
require("./routes/customer-api-routes.js")(app);
require("./routes/employee-api-routes.js")(app);

require("./routes/html-routes.js")(app);


// Starting our Express app
// =============================================================

db.sequelize.sync({force:false}).then(function(){
  app.listen(PORT, function(){
    console.log(`APP listening on PORT ${PORT}`)
  })
})
