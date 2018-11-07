var express     = require("express");
var router      = express.Router({mergeParams : true});
var middleware  = require("../middleware");
var MapboxClient = require('mapbox');
/*var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);*/
var client = new MapboxClient(process.env.YOUR_ACCESS_TOKEN);

var PantheraName    = require("../models/pantheras");


//===========================
// Show all pantheras
//===========================

router.get("/", function(req, res){
    
    PantheraName.find({}, function(err, panthera){
        if(err){
            console.log("Oops Thats an Error : ");
            console.log(err);
        }
        else{
            res.render("panthera/panthera", {panthera : panthera});
        }
    });
    
    //
});


//==========================
//create a panthera
//==========================

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
      var name = req.body.name;
      var image = req.body.image;
      var desc = req.body.desc;
      var author = {
          id: req.user._id,
          username: req.user.username
      };
      /*//geocoder.geocode(req.body.location, function (err, results, status) 
      client.geocodeForward(req.body.location, function (err, results){
            if (err || !results.length) {
              console.log(req.body.location);
              console.log(results);
              req.flash('error', 'Invalid address, try something else');
              return res.redirect('back');
            }
            var lat = results[0].latitude;
            var lng = results[0].longitude;
            var location = results[0].formattedAddress;*/
            var newPanthera = {name: name, image: image, description: desc, author:author/*, location: location, lat: lat, lng: lng*/};
            // Create a new campground and save to DB
            PantheraName.create(newPanthera, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to campgrounds page
                    /*console.log(newlyCreated);*/
                    res.redirect("/panthera");
                }
            });
      /*});*/
});


//=============================
//request for creating a panthera
//=============================


router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("panthera/newpanthera");
});


//====================
//show a panthera
//====================

router.get("/:id", function(req, res){
    PantheraName.findById(req.params.id).populate("comment").exec(function(err,panthera){
        if(err){
            console.log(err);
        }
        else{
            console.log("====================");
             res.render("panthera/show", {pantheras : panthera});
        }
    });
   
});

//=====================
// Edit A Panthera
//=====================
router.get("/:id/edit",middleware.isPantheraLoggedInAndAuthorised, function(req, res) {
    PantheraName.findById(req.params.id, function(err, foundPanthera){
            if(err || !foundPanthera) {
                    console.log(err);
                    req.flash('error', 'Sorry, that panthera does not exist!');
                    res.redirect('/panthera');
            }
            else{
                res.render("panthera/edit", {pantheras : foundPanthera});
            }
        });
});


//=====================
// Update A Panthera
//=====================

router.put("/:id",middleware.isPantheraLoggedInAndAuthorised, function(req, res){
    /*geocoder.geocode(req.body.location, function (err, data)*/ 
   /* client.geocodeForward(req.body.location, function (err, data) {
    if (err || data.status === 'ZERO_RESULTS') {
      console.log(err);
      req.flash('error', 'Invalid address,  try typing a new address');
      return res.redirect('back');
    }
    req.body.panthera.lat = data[0].latitude;
    req.body.panthera.lng = data[0].longitude;
    req.body.panthera.location = data[0].formattedAddress;*/
        PantheraName.findByIdAndUpdate(req.params.id, req.body.panthera ,function(err, updatePanthera){
            if(err || !updatePanthera) {
                        console.log(err);
                        req.flash('error', 'Sorry, that panthera does not exist!');
                        res.redirect('/panthera');
            }
            else {
                req.flash("success", "Successfully updated panthera");
                res.redirect("/panthera/" + req.params.id);
            }
        });
    /*});*/
});
//==================
//delete a panthera
//===================

router.delete("/:id", middleware.isPantheraLoggedInAndAuthorised, function(req, res){
    PantheraName.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/panthera");
        }
        else{
            req.flash("success", "Successfully deleted panthera");
            res.redirect("/panthera");
        }
    });
});

module.exports = router;