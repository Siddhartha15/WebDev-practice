var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//INDEX - Show all campgrounds
router.get("/campgrounds",(req,res)=>{
    
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
router.post("/campgrounds",(req,res)=>{

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
router.get("/campgrounds/new",(req,res)=>{
    res.render("campgrounds/new");    
});

// SHOW - show more info about one campground
router.get("/campgrounds/:id",(req,res)=>{
    
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


module.exports=router;