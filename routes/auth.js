var path = require("path");

var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/sale',
 
            failureRedirect: '/signup'
        }
 
    ));
 
 
    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
 
 
    app.get('/logout', authController.logout);
 
 
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/sale',
 
            failureRedirect: '/signin'
        }
 
    ));
 
      // index route loads view.html
//   app.get("/signup", function(req, res) {
//     res.sendFile(path.join(__dirname, "./signup.html"));
//   });
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated()){
            console.log("hit!");
            return next();
        }
 
 
        res.redirect('/signin');
 
    }
 
}







// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================

