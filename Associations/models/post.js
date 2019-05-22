var mongoose = require("mongoose");

 //POST SCHEMA - title,content
 var postSchema = new mongoose.Schema({
    title:String,
    content:String
 });
 
//  var postModel = mongoose.model("Post",postSchema);

module.exports= mongoose.model("Post",postSchema);