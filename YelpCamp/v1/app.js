var express = require("express");
var app = express();
var bodyparser= require("body-parser");

// extras start here
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
// extras end here


 var campgrounds = [
            {name:"salamon gees", image:"https://www.photosforclass.com/download/flickr-321487195"},
            {name:"adadasd", image:"https://www.photosforclass.com/download/flickr-6015893151"},
            {name:"sdsdf rgefe", image:"https://www.photosforclass.com/download/flickr-9627572189"},
            {name:"sasdfs ddees", image:"https://www.photosforclass.com/download/flickr-1342367857"},
            {name:"salamon gees", image:"https://www.photosforclass.com/download/flickr-321487195"},
            {name:"adadasd", image:"https://www.photosforclass.com/download/flickr-6015893151"},
            {name:"sdsdf rgefe", image:"https://www.photosforclass.com/download/flickr-9627572189"},
            {name:"sasdfs ddees", image:"https://www.photosforclass.com/download/flickr-1342367857"},
            {name:"salamon gees", image:"https://www.photosforclass.com/download/flickr-321487195"},
            {name:"adadasd", image:"https://www.photosforclass.com/download/flickr-6015893151"},
            {name:"sdsdf rgefe", image:"https://www.photosforclass.com/download/flickr-9627572189"},
            {name:"sasdfs ddees", image:"https://www.photosforclass.com/download/flickr-1342367857"}
       ]; 
       

// routes start here

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
  
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res)=>{

    // get data from form and add it to campgrounds array
   var name=req.body.name;
   var imageurl = req.body.image;
   var newCampground = {name:name, image:imageurl};
   campgrounds.push(newCampground);
   
   // redirect back to campgrounds page
   res.redirect("/campgrounds");
   
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new");    
});

// routes end here

// server setup
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp camp Server started");
});