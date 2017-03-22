//Require packages.
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

//Require routes.  
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// Create YelpCamp DB inside of Mongo.
mongoose.connect("mongodb://localhost/yelp_camp");

// Boilerplate for body-parser.
app.use(bodyParser.urlencoded({extended: true}));

// Set all templates to be ejs automatically.
app.set("view engine", "ejs");

//Connect external stylesheet (__dirname ensure access if path changes).
app.use(express.static(__dirname + "/public"));

//Use methodOverride in app.
app.use(methodOverride("_method"));

//Use connect-flash in app.
app.use(flash());

//Seed database.
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is my secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//END PASSPORT CONFIG

//Middleware to identify if there is a current user.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Tell app.js to use the route files required above.
//Route text ("") appends in front of the named route.
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Boilerplate listening for server renders.
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started.");
});