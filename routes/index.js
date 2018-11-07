var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport        = require("passport");



router.get("/", function(req, res){
    //res.send("This landing page should be up soon");
    res.render("landing");
});


//===========================
//Register
//===========================


router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({
        username : req.body.username,
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        image    : req.body.image,
        email    : req.body.email,
        aboutMe  : req.body.aboutMe
    });
    if(req.body.isAdminCode === "secretkey2018"){
            newUser.isAdmin = true;
        }
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/panthera");
        });
    });
});


//===========================
//Login
//===========================

router.get("/login", function(req, res) {
    if(!(req.isAuthenticated())){
    res.render("login");
    }
     req.flash("success", "You are already logged in!");
     res.redirect("/panthera");
    
});

//===========================
//login logic
//===========================

router.post("/login", passport.authenticate("local", {
    successRedirect: "/panthera",
    failureRedirect: "/login"
    }), 
    function(err){
        if(err){
            console.log(err.message);
        }
    }
);


//===========================
//Logout
//===========================

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/login");
});

module.exports = router;