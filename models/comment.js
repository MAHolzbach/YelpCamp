var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
   text: String,
   //Refactored to associate comments with users via an object.
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Comment", commentSchema);