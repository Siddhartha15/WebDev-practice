var mongoose    = require("mongoose");

// Data Base schema 
var campgroundSchema = mongoose.Schema({
    name: String,
    image:String,
    description:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});
//Data Base Schema ends here

module.exports = mongoose.model("Campground",campgroundSchema);