var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"); 
    

// extras start here
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
// extras end here

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
// Auth setup ends -------------------------------------------

// passing current user to all routes by this middleware ----
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})
//-----

seedDB();


// DataBase config
mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', { useNewUrlParser: true });
// Data Base config ends here


// Auth Routes

//show sign up form
app.get("/register", function(req, res){
  res.render("register"); 
});
// handling user sign up
app.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
          res.redirect("/campgrounds");
        });
    });
});

// LOGIN ROUTES

//render login form
app.get("/login", function(req, res){
  res.render("login"); 
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// auth middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    {
        return next();
    }
    
    res.redirect("/login");
}

// routes start here ============================================

app.get("/",function(req,res){
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds",(req,res)=>{
    
    // var currentUser = req.user;
    // get all campgrounds from DB
    Campground.find({},(err,allcampgrounds)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds});
        }
    });
    
});

// CREATE - add new campground to DB
app.post("/campgrounds",(req,res)=>{

    // get data from form and add it to campgrounds array
   var name=req.body.name;
   var imageurl = req.body.image;
   var desc = req.body.description;
   var newCampground = {name:name, image:imageurl, description:desc};
   
   // put newCampground into DB
   Campground.create(newCampground,(err,campground)=>{
       if(err){
           console.log(err);
       }
       else{
           console.log("New Campground created in DB:");
           console.log(campground);
       }
   });
   
   // redirect back to campgrounds page
   res.redirect("/campgrounds");
   
});

// NEW - Show form to add new campground
app.get("/campgrounds/new",(req,res)=>{
    res.render("campgrounds/new");    
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id",(req,res)=>{
    
    // find the campground with that ID 
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("Found the campground:");
            console.log(foundCampground);
             //render the show template for that campground
            res.render("campgrounds/show",{foundCampground:foundCampground}); 
        }
    });
   
});

// Comments Routes ---------------------

 // New - show form to add comments under a particlar campground with associated ID
app.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
    
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("comments/new",{foundCampground:foundCampground});
        }
    });
    
    
});

// CREATE - add new comment under particular campground
app.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
   //lookup for a campground using the id
   Campground.findById(req.params.id,(err,campground)=>{
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      }else
      {
          Comment.create(req.body.comment,(err,comment)=>{
              if(err){
                        console.log(err);
                        res.redirect("/campgrounds");
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
          });
      }
   });
   //create new comment
   
   //connect new comment to campground
   
   //redirect
});

// Comments routes ends here ----------------

// routes end here ===========================================

// server setup
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp camp Server started");
});