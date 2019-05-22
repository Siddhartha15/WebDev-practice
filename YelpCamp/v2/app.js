var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose");

// extras start here
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
// extras end here

// DataBase config
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
// Data Base config ends here

// Data Base schema 
var campgroundSchema = mongoose.Schema({
    name: String,
    image:String,
    description:String
});
//Data Base Schema ends here

var Campground = mongoose.model("Campground",campgroundSchema);


// routes start here

app.get("/",function(req,res){
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds",(req,res)=>{
    
    // get all campgrounds from DB
    Campground.find({},(err,allcampgrounds)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allcampgrounds});
        }
    });
    
});

// CREATE - add new campground to DB
app.post("/campgrounds",(req,res)=>{

    // get data from form and add it to campgrounds array
   var name=req.body.name;
   var imageurl = req.body.image;
   var desc = req.body.description;
//   var description = req.body.description;
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
    res.render("new");    
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id",(req,res)=>{
    
    // find the campground with that ID 
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("Found the campground:");
            console.log(foundCampground);
             //render the show template for that campground
            res.render("show",{foundCampground:foundCampground}); 
        }
    });
   
});

// routes end here

// server setup
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp camp Server started");
});