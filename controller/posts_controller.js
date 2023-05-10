const Post = require('../model/posts');
const Comment = require('../model/comments');

module.exports.createpost = function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }).then((post)=>{     
        return res.redirect('/');
    }).catch((err)=>{
        if(err){
        console.log('err : ',err);
        return;
        }
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then((post)=>{
        // .id instead of ._id will automatically helps us compare with post.user which is objectid
        // or else we need to convert post.user to string
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post : req.params.id}).catch((err)=>{
                console.log('Error in removing the commments of the post : ',err);
                res.redirect('back');
            })
            res.redirect('/');
        }else{
            res.redirect('back');
        }
    })
}