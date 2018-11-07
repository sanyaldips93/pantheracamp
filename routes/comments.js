var express     = require("express");
var router      = express.Router({mergeParams : true});
var middleware  = require("../middleware");

var PantheraName    = require("../models/pantheras"),
    Comment         = require("../models/comments");

//================
//Create a comment
//================

router.get("/new", middleware.isLoggedIn, function(req, res){
    PantheraName.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
        }
        else{
             res.render("comment/new",{pantheras:data});
        }
    });
   
});

//===============
//post a comment
//===============
router.post("/", middleware.isLoggedIn, function(req, res){
    PantheraName.findById(req.params.id, function(err, data) {
        if(err){
            console.log(err);
            res.redirect("/panthera");
        }
        else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                    res.redirect("/panthera");
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    data.comment.push(comment);
                    data.save();
                    res.redirect("/panthera/"+data._id);
                }
            });
        }
    });
});


//===============
//edit a comment
//===============
router.get("/:id2/edit", middleware.isLoggedInAndAuthorised, function(req, res){
    PantheraName.findById(req.params.id, function(err, data){
        if(err || !data){
            console.log(err);
            req.flash('error', 'Sorry, that panthera does not exist!');
            res.redirect("/panthera");
        }
        else{
             Comment.findById(req.params.id2, function(err, data2){
                if(err|| !data2){
                    console.log(err);
                    req.flash('error', 'Sorry, that comment does not exist!');
                    res.redirect("/panthera/"+data._id);
                }
                else{
                    res.render("comment/edit", {pantheras :data, comment2 : data2});
                }
            });
        }
    });
});

router.put("/:id2", middleware.isLoggedInAndAuthorised, function(req, res){
   PantheraName.findById(req.params.id, function(err, data) {
        if(err || !data){
            console.log(err);
            req.flash('error', 'Sorry, that panthera does not exist!');
            res.redirect("/panthera");
        }
        else{
            Comment.findByIdAndUpdate(req.params.id2, req.body.comment, function(err,comment){
                if(err|| !comment){
                    console.log(err);
                    req.flash('error', 'Sorry, that comment does not exist!');
                    res.redirect("/panthera/"+data._id);
                }
                else{
                    req.flash("success", "Successfully updated comment");
                    res.redirect("/panthera/"+data._id);
                }
            });
        }
    }); 
});

//==========================
//Delete a comment
//==========================

router.delete("/:id2", middleware.isLoggedInAndAuthorised, function(req, res){
   PantheraName.findById(req.params.id, function(err, data) {
        if(err){
            console.log(err);
            res.redirect("/panthera");
        }
        else{
            Comment.findByIdAndRemove(req.params.id2, function(err,comment){
                if(err){
                    console.log(err);
                    res.redirect("/panthera/"+data._id);
                }
                else{
                    req.flash("success", "Successfully deleted comment");
                    res.redirect("/panthera/"+data._id);
                }
            });
        }
    }); 
});



module.exports = router;