var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// Root Routes
router.get("/",function(req,res){
    res.render("landing");
});

// Auth Routes

//show sign up form
router.get("/register", function(req, res){
  res.render("register"); 
});
// handling user sign up
router.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.username});
    
    
    
    
    
    //Form Validation

    // req.checkBody('username', 'Name Field is Required').notEmpty();
    // // req.checkBody('email', 'Email Field is Required').notEmpty();
    // // req.checkBody('email', 'Enter Correct Email').isEmail();
    // req.checkBody('password', 'Password  Field is Reqired').notEmpty();
    req.checkBody('confirmPassword', 'Password Doesn\'t match').equals(req.body.password);

    //Check For Errors

    var errors = req.validationErrors();
    
    
    if(errors)
    {
        req.flash("error","Passwords Not Matching!!!");
        res.render('register');   
    }
    else
    {
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                 req.flash("error",err.message);
                return res.render('register');
            }
            passport.authenticate("local")(req, res, function(){
             req.flash("success","Welcome to YelpCamp "+user.username);
              res.redirect("/campgrounds");
            });
        });
    }
    
    
});

// LOGIN ROUTES

//render login form
router.get("/login", function(req, res){
  res.render("login"); 
});

//login logic
//middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

//logout logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success","Successfully Logged Out");
    res.redirect("/campgrounds");
});

module.exports=router;