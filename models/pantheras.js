var mongoose    = require("mongoose");
var pantheraSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc : String,
    location : String,
    lat : Number,
    lng : Number,
    createdAt : { type : Date, default : Date.now },
    author : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    comment : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
        ]
});

var PantheraName = mongoose.model("Panthera", pantheraSchema);
module.exports = PantheraName;