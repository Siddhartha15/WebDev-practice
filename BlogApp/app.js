var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"), // sanitizer is used remove scripts while updating and creating blogs
    mongoose = require("mongoose"),
    //html forms doesnt support put and delete requests..
    //for making http put and delete requests...
    methodOverride = require("method-override");
 // app config 
 mongoose.connect("mongodb://localhost:27017/myblog_db",{ useNewUrlParser: true });
 
 app.set("view engine","ejs");
 app.use(bodyparser.urlencoded({extended: true}));
 app.use(expressSanitizer()); // this shld be after body parser is used ...//
 app.use(express.static("public"));
 app.use(methodOverride("_method")); //
 
 
 // blog schema
 var blogSchema = new mongoose.Schema({
     
     title : String,
     image : String,
     body  : String,
     created : {type : Date, default:Date.now}
 });
 
 var Blog = mongoose.model("Blog",blogSchema);
 
 
 // ROUTES start here
 
 app.get("/",(req,res)=>{
    res.redirect("/blogs"); 
 });
 
 // INDEX ROUTE
 app.get("/blogs",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blogs:blogs});   
        }
    });
 });
 
 //NEW ROUTE
 app.get("/blogs/new",(req,res)=>{
     res.render("new");
 });
 
 //CREATE ROUTE
 app.post("/blogs",(req,res)=>{
     // create blog
     req.body.blog.body=req.sanitize(req.body.blog.body); // sanitizing the body of blog..//
     Blog.create(req.body.blog,(err,blog)=>{
         if(err){
             console.log(err);
         }
         else{
             // redirect to blogs page to view it
             res.redirect("/blogs");
         }
     });
 });
 
 // SHOW ROUTE
 app.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
       if(err)
       {
           res.redirect("/blogs");
       }
       else
       {
           res.render("show",{blog:foundBlog});
       }
    });
 });
 
 // EDIT ROUTE
 app.get("/blogs/:id/edit",(req,res)=>{
     
     Blog.findById(req.params.id,(err,foundBlog)=>{
       if(err)
       {
           res.redirect("/blogs");
       }
       else
       {
           res.render("edit",{blog:foundBlog});
       }
    });
 });
 
 // UPDATE ROUTE
 app.put("/blogs/:id",(req,res)=>{
     
     req.body.blog.body=req.sanitize(req.body.blog.body); // sanitizing the body of blog..//
     Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err){
            console.log(err);
            alert("Not Updated");
            res.redirect("/blogs");
        } 
        else{
            console.log(updatedBlog);
            res.redirect("/blogs/"+req.params.id);
        }
     });
 });
 
 //DELETE ROUTE
 app.delete("/blogs/:id",(req,res)=>{
    Blog.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            console.log(err);
            res.redirect("/blogs")
        }
      else
      {
          res.redirect("/blogs")
      }
        
    }); 
 });
 
 // ROUTES ends here
 
 
 // app config
 app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("Server running"); 
 });