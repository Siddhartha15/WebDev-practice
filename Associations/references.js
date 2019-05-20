var mongoose = require("mongoose");

 mongoose.connect("mongodb://localhost:27017/blog_demo_2",{ useNewUrlParser: true });
 
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
     posts : [
         {
            type :mongoose.Schema.Types.ObjectId,
            ref:"Post"
         }
     ]
 }) ;
 
 var userModel = mongoose.model("User",userSchema);
 

 //============================================================================================
 
//  postModel.create({
//      title:"hello wdwd -4",
//      content:"asdhanos asodsancoasc caochascaocl zxcsd"
//  },(err,post)=>{
//     if(err){
//         console.log(err);
//     } else{
//         userModel.findOne({name:"Ravi"},(err,foundUser)=>{
//             if(err){
//                 console.log(err);
//             }else{
//                 foundUser.posts.push(post);
//                 foundUser.save((err,data)=>{
//                   if(err){
//                       console.log(err);
//                   } else{
//                       console.log(data);
//                   }
//                 });
//             }
//         })
//     }
//  });



userModel.findOne({name:"Ravi"}).populate("posts").exec((err,user)=>{
    if(err)
    {
        console.log(err);
    }else{
        console.log(user);
    }
});