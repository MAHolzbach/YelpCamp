//Set up router for export and require needed files.
var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//Root route.
router.get("/", function(req, res){
    res.render("landing");
});

//Show register form.
router.get("/register", function(req, res){
    res.render("register");
});

//Handle signup logic.
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    //Once a user registers...
    User.register(newUser, req.body.password, function(err, user){
        //...if there's an error, send them back to registration form...
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        //...or log them in and redirect to campgrounds.
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show login form.
router.get("/login", function(req, res){
   res.render("login");
});

//Handle login logic.
//When request is made to login, passport middleware 
//runs authenticate local method...
router.post("/login", passport.authenticate("local", 
    {
        //...with ensuing redirect as needed.
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
        
    }), function(req, res){
});

//Logout route.
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;