var mongoose    = require("mongoose");

// Data Base schema 
var campgroundSchema = mongoose.Schema({
    name: String,
    image:String,
    description:String
});
//Data Base Schema ends here

module.exports = mongoose.model("Campground",campgroundSchema);