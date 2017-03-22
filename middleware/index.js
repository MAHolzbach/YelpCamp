var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

//Middleware to check campground ownership.
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //If user is logged in...
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                //does the user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();          
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

//Middleware to check comment ownership.
middlewareObj.checkCommentOwnership = function (req, res, next){
    //If user is logged in...
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();          
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

//Middleware function to ensure person is 
//logged in to use site; then call where needed above.
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //Flash message must be before redirect.
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};


module.exports = middlewareObj;