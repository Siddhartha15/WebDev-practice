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
router.post("/campgrounds",isLoggedIn,(req,res)=>{

    // get data from form and add it to campgrounds array
   var name=req.body.name;
   var imageurl = req.body.image;
   var desc = req.body.description;
   var author={
       id:req.user._id,
       username:req.user.username
   };
   var newCampground = {name:name, image:imageurl, description:desc,author:author};
   
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
router.get("/campgrounds/new",isLoggedIn,(req,res)=>{
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

//EDIT - edit the campground...
router.get("/campgrounds/:id/edit",(req,res)=>{
    
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else
        res.render("campgrounds/edit",{campground:foundCampground}); 
    })    

});
//UPDATE - update the campground....
router.put("/campgrounds/:id",(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
       if(err)
       {
           console.log(err);
           res.redirect("/campgrounds");
       }
       else{
           res.redirect("/campgrounds/"+updatedCampground._id);
       }
    });
});
//DELETE - delete the campground
router.delete("/campgrounds/:id",(req,res)=>{
    
   Campground.findByIdAndRemove(req.params.id,(err)=>{
       if(err){
           console.log(err);
       }
        console.log("Deleted the campground");
        res.redirect("/campgrounds");
   }) 
});


//auth midlleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    {
        return next();
    }
    
    res.redirect("/login");
}



module.exports=router;