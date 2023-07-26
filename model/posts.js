const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //creating a comments array to store the all the comments id's of particular post.
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
},{
    timestamps :true
});

const Posts = mongoose.model('Posts',postSchema);

module.exports = Posts;