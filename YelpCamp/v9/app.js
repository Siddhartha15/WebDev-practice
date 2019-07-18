var express     = require("express"),
    app         = express(),
    expressValidator = require('express-validator'), // form validator
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"), // for flash messages
    methodOverride = require("method-override"), // for http put and post requests in forms
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"); 

// requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");
    
    
// App config
app.use(expressValidator())
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport Config --- Authentication setup -------------------
app.use(require("express-session")({
    secret: "ka7hw%BDdhwi*%$dw96dd0%g936bc9^dwi39&hf0BDJE^(Dndhd7DRB02e8)Ndow937jr03rjfsooosf030jf3*03h20^$dwj9",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---------------------------------------------------------------

// passing current user to all routes by this middleware ----
// passing message to headers for every message trigerred...
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

// seeding the DB
// seedDB();


// DataBase config
mongoose.connect('mongodb://localhost:27017/yelp_camp_v8', { useNewUrlParser: true });
mongoose.connection.once('open',()=>{
	console.log("connection Made");
});
// routes
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


// server setup
app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log("Yelp camp Server started");
    // console.log(process.env.PORT);
});