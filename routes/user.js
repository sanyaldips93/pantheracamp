var express     = require("express");
var router      = express.Router({mergeParams : true});
var User        = require("../models/user");
var Panthera    = require("../models/pantheras");
var middleware  = require("../middleware");

router.get("/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err || !foundUser){
            console.log(err);
            if(req.isAuthenticated()){
                req.flash("error", "No Such User found, Please sign up!");
                res.redirect("/panthera");
            }
            else{
                req.flash("error", "No Such User found, Please sign up!");
                res.redirect("/login");
            }
            
        }
        else{
            Panthera.find().where("author.id").equals(foundUser._id).exec(function(err, foundPanthera){
                if(err){
                    req.flash("error", "There is some internal error, we are processing");
                    res.redirect("/panthera");
                }
                res.render("user/profile", {foundUser : foundUser, panthera : foundPanthera});
            });
        }
    });
});

router.get("/:id/edit", middleware.IsUserLoggedInAndAuthorised, function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "The User dont exist");
            res.redirect("/panthera");
        }
        else{
            res.render("user/editprofile", {foundUser : foundUser});
        }
    });
});

router.put("/:id",middleware.IsUserLoggedInAndAuthorised, function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "The User dont exist");
            res.redirect("/panthera");
        }
        else{
            console.log(foundUser);
            res.redirect("/user/"+req.params.id);
        }
    });
});

router.delete("/:id", middleware.IsUserLoggedInAndAuthorised, function(req,res){
    User.findByIdAndRemove(req.params.id, function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "The User dont exist");
            res.redirect("/panthera");
        }
        else{
            res.redirect("/panthera");
        }
    });
});


module.exports = router;