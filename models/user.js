var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema(
    {
        username : String,
        password : String,
        firstName : {type : String, default : null},
        lastName : {type : String, default : null},
        image    : {type : String, default : null},
        email    : {type : String, default : null},
        aboutMe  : {type : String, default : null},
        isAdmin  : {type : Boolean, default : false}
    }
    );
    
UserSchema.plugin(passportLocalMongoose);
    
var User = mongoose.model("User", UserSchema);
module.exports = User;