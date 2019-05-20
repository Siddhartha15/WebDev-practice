var mongoose = require("mongoose");

 mongoose.connect("mongodb://localhost:27017/blog_demo",{ useNewUrlParser: true });
 
 // Schema ===================================================================================
 
  //POST SCHEMA - title,content
 var postSchema = new mongoose.Schema({
    title:String,
    content:String
 });
 
 var postModel = mongoose.model("Post",postSchema);
 
 
 //USER SCHEMA - email,name
 var userSchema = new mongoose.Schema({
     email:String,
     name : String,
     posts : [postSchema]
 }) ;
 
 var userModel = mongoose.model("User",userSchema);
 

 //============================================================================================
 
//   New User
 
//  var newUser = new userModel({
//     email:"siddhartha@gmail.com",
//     name:"Siddd"
//  });
 
//   var newPost = new postModel({
//   title:"Refl lore lorem ipsom",
//   content:"Tlorem lorem lore lorem ipsum lorem loerm pensd"
// });

// newUser.posts.push(newPost);

//  newUser.save((err,savedUser)=>{
//      if(err){
//          console.log(err);
//      }else{
//          console.log(savedUser);
//      }
//  });



// newPost.save((err,savedPost)=>{
//   if(err)
//   {
//       console.log(err);
//   }
//   else{
//       console.log(savedPost);
//   }
// });


userModel.findOne({name:"Siddd"},(err,foundUser)=>{
    if(err)
  {
    //   console.log(err);
  }
  else{
      foundUser.posts.push({
          title:"Hellw Worls",
          content:"Helo all this demo vocnte contenc"
      });
      foundUser.save((err,saveduser)=>{
              if(err)
              {
                  console.log(err);
              }
              else{
                  console.log(saveduser);
              }
          });
  }
        
});