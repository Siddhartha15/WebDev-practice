var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj=require("../middleware/index");

// New - show form to add comments under a particlar campground with associated ID
router.get("/campgrounds/:id/comments/new",middlewareObj.isLoggedIn,(req,res)=>{
    
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
router.post("/campgrounds/:id/comments",middlewareObj.isLoggedIn,(req,res)=>{
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
                    //add user to comments
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save comments
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
          });
      }
   });
});

//EDIT - edit the comment
router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObj.checkCommentOwnership,(req,res)=>{
    
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if(err){
            res.redirect("back");
        }
        else
        res.render("comments/edit",{comment:foundComment,campgroundId:req.params.id}); 
    })    

});
//UPDATE - update the comment
router.put("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
       if(err)
       {
           console.log(err);
           res.redirect("back");
       }
       else{
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
});
//DELETE - delete the comment
router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,(req,res)=>{
   
   Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
       if(err){
           console.log(err);
           res.redirect("back");
       }
        console.log("Deleted the comment");
        res.redirect("/campgrounds/"+req.params.id);
   }) 
   
});


module.exports=router;