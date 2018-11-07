/*var mongoose    = require("mongoose");
var PantheraName = require("./models/pantheras");
var Comment = require("./models/comments");

var data = [
    {
        name : "Lion",
        image: "https://farm1.staticflickr.com/174/392575238_80a2434af1.jpg",
        desc  : "King of the Jungle"
    },
    {
        name : "Tiger",
        image: "https://farm4.staticflickr.com/3118/2462688393_af596cdfff.jpg",
        desc  : "Ferocious of all"
    },
    {
        name : "Leopard",
        image: "https://farm9.staticflickr.com/8228/8512828555_2eb8d025ce.jpg",
        desc  : "Fastest of all"
    }
    ];

function seedDB(){
    //Remove All Pantheras
    PantheraName.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed");
            data.forEach(function(data){
                PantheraName.create(data, function(err, data){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added a panthera");
                        Comment.create(
                            {
                                text : "These are ferocious reptiles",
                                author : "Robert Irwin"
                            }, function(err, comments){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    data.comment.push(comments);
                                    data.save();
                                    console.log(data);
                                }
                            });
                    }
                });
            });
        }
    });
}

module.export = seedDB();*/