//Set up router for export and require needed files.
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// var Comment = require("../models/comment");
var middleware = require("../middleware/index.js")

// INDEX route. Show all campgrounds. 
router.get("/", function(req, res){
    // Get all campgrounds from DB and render.
    Campground.find({}, function(err, allCampgrounds){
       if(err) {
           console.log(err);
       } else {
           // Pass data through to campgrounds template and assign a current user.
           res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
       }
    });
});

// CREATE route. Use /campgrounds name ok, 
// this is .post, above is .get. 
router.post("/", middleware.isLoggedIn, function(req, res) {
    // Get new data from the form in the body.
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // var is an obj, same as campgrounds array data.
    var newCampground = {name: name, image: image, description: description, author: author};
    // Create a new campground and save to DB, then redirect to /campgrounds.
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW route. New camp submission form page. 
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW route. Show more info on a single campground. 
// Must come after /new; route order matters.
// App.js lines 51-55: "/campgrounds" auto-appended.
router.get("/:id", function(req, res){
    //Find campground with id 
    // and render show template with that campground.
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT campground route.
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE campground route.
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //Find and update campground.
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//DESTROY campground route.
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
            res.redirect("/campgrounds");
       }
    });
});


//Export these routes for app.js.
module.exports = router;
