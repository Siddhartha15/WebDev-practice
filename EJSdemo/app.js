var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set("view engine","ejs");

var friends=["sidd","chan","sanath","ashwin","shashi","shrinidhi","ravi"];

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/friends",(req,res)=>{
    
    
   res.render("friends",{friends:friends}); 
});

app.post("/addFriend",(req,res)=>{
    friends.push(req.body.newfriend);
    
   res.redirect("/friends");
});





app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("Serving on PORT:"+process.env.PORT+"\nIP:"+process.env.IP);
});