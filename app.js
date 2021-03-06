require('dotenv').config();
var express         = require("express"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    seedDB          = require("./seeds"),
    User            = require("./models/user");
    
var pantheraRoutes  = require("./routes/panthera"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index"),
    userRoutes      = require("./routes/user");
    
seedDB;
mongoose.connect("mongodb://localhost/yelp_camp_v5" , { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());

app.use(require("express-session")({
    name   : "session",
    secret : "Dipayan is the best unbest",
    resave : false,
    saveUninitialized : false,
    maxAge : 24 * 60 * 60
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.locals.moment = require('moment');

app.use("/panthera",pantheraRoutes);
app.use("/panthera/:id/comment",commentRoutes);
app.use(indexRoutes);
app.use("/user",userRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp is up!!");
});