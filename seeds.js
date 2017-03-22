var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere sapien ac bibendum euismod. Aliquam finibus odio at ligula fermentum, sed molestie odio tempor. Pellentesque interdum sit amet ipsum sed dictum. Aenean a suscipit odio, a auctor nulla. Suspendisse potenti. Nam eu quam at dolor tempus posuere a sed nisi. Vivamus ultricies nunc vel posuere dapibus. Curabitur varius pellentesque maximus. Nulla vel mi tristique purus ultricies venenatis. Morbi viverra, velit in tristique lobortis, eros lorem lacinia ante, a sodales lectus ipsum ultrices elit."
    },
    {
        name: "Walker's Rest",
        image: "https://farm4.staticflickr.com/3069/2942421645_38b206298a.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere sapien ac bibendum euismod. Aliquam finibus odio at ligula fermentum, sed molestie odio tempor. Pellentesque interdum sit amet ipsum sed dictum. Aenean a suscipit odio, a auctor nulla. Suspendisse potenti. Nam eu quam at dolor tempus posuere a sed nisi. Vivamus ultricies nunc vel posuere dapibus. Curabitur varius pellentesque maximus. Nulla vel mi tristique purus ultricies venenatis. Morbi viverra, velit in tristique lobortis, eros lorem lacinia ante, a sodales lectus ipsum ultrices elit."
    },
    {
        name: "Your mom's Rest",
        image: "https://farm4.staticflickr.com/3252/3088526265_ccee3ed35f.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere sapien ac bibendum euismod. Aliquam finibus odio at ligula fermentum, sed molestie odio tempor. Pellentesque interdum sit amet ipsum sed dictum. Aenean a suscipit odio, a auctor nulla. Suspendisse potenti. Nam eu quam at dolor tempus posuere a sed nisi. Vivamus ultricies nunc vel posuere dapibus. Curabitur varius pellentesque maximus. Nulla vel mi tristique purus ultricies venenatis. Morbi viverra, velit in tristique lobortis, eros lorem lacinia ante, a sodales lectus ipsum ultrices elit."
    },
]

function seedDB(){
    //Remove all campgrounds.
        Campground.remove({}, function(err){
            if(err){
                console.log(err);
            }
        console.log("removed campgrounds!");
        //Add a few campgrounds.
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Campground created!");
                    //Create a comment.
                    Comment.create(
                        {
                            text:"Great place!",
                            author: "You"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a comment!");
                            }
                        });
                }
            });
        });
    });
    //Add a few comments.
}

module.exports = seedDB;
