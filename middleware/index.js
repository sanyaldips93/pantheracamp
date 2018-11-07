var PantheraName    = require("../models/pantheras"),
    User            = require("../models/user"),
    Comment         = require("../models/comments");

var middleware = {};

middleware.isLoggedIn = 
    function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please log in to continue!");
        res.redirect("/login");
    };

middleware.isLoggedInAndAuthorised = 
    function isLoggedInAndAuthorised(req,res,next){
        if(req.isAuthenticated()){
            PantheraName.findById(req.params.id, function(err, foundPanthera){
                if(err || !foundPanthera) {
                    console.log(err);
                    req.flash('error', 'Sorry, that panthera does not exist!');
                    res.redirect('/panthera');
                }
                else{
                    Comment.findById(req.params.id2, function(err, foundComment){
                        if(err|| !foundComment){
                            console.log(err);
                            req.flash('error', 'Sorry, that comment does not exist!');
                            res.redirect('/panthera');
                        }
                        else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                           return next();
                        }
                        else{
                            req.flash("error", "You do not have permission to do that!");
                            res.redirect("back");
                        }
                    });
                }
            });
        }
        else{
            req.flash("error", "You need to log in to do that");
            res.redirect("back");
        }
    };
    
    
middleware.isPantheraLoggedInAndAuthorised = 
    function (req,res,next){
        if(req.isAuthenticated()){
            PantheraName.findById(req.params.id, function(err, foundPanthera){
                if(err || !foundPanthera) {
                    console.log(err);
                    req.flash('error', 'Sorry, that panthera does not exist!');
                    res.redirect('/panthera');
                }
                else{
                    if(foundPanthera.author.id.equals(req.user._id) || req.user.isAdmin){
                       return next();
                    }
                    else{
                        req.flash("error", "You do not have permission to do that!");
                        res.redirect("back");
                    }
                    
                }
            });
        }
        else{
            req.flash("error", "You need to log in to do that");
            res.redirect("back");
        }
    };
    
    
middleware.IsUserLoggedInAndAuthorised =
    function(req,res,next){
         if(req.isAuthenticated()){
             User.findById(req.params.id, function(err, foundUser){
                if(err || !foundUser) {
                    console.log(err);
                    req.flash('error', 'Sorry, that user does not exist!');
                    res.redirect('/panthera');
                }
                else{
                    if((foundUser.id === (req.user._id.toString())) || req.user.isAdmin){
                       return next();
                    }
                    else{
                        req.flash("error", "You do not have permission to do that!");
                        res.redirect("back");
                    }
                    
                }
            });
         }
         else{
             req.flash("error", "Please log in to do this!");
             res.redirect("/login");
         }
    };
    
module.exports = middleware;