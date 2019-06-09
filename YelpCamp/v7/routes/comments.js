var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// New - show form to add comments under a particlar campground with associated ID
router.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
    
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
router.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
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