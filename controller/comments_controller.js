const Comment = require('../model/comments');
const Post = require('../model/posts');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        Comment.create({
            content : req.body.content,
            user  : req.user._id,
            post : req.body.post
        }).then((comment)=>{
            post.comment.push(comment);
            post.save();
            return res.redirect('back');
        }).catch((err)=>{
            console.log("err : ", err);
            return;
        })

    }).catch((err)=>{
        console.log("err : ", err);
        return;
    });
}