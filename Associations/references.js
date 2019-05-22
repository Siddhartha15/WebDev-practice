var mongoose = require("mongoose");
var postModel=require("./models/post");
var userModel=require("./models/user");


mongoose.connect("mongodb://localhost:27017/blog_demo_2",{ useNewUrlParser: true });
 

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