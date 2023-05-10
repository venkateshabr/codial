const Comment = require('../model/comments');
const Post = require('../model/posts');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        Comment.create({
            content : req.body.content,
            //even if we write req.user it will get the objectid correctly
            user  : req.user._id,
            post : req.body.post
        }).then((comment)=>{
            //console.log(comment);
            //push the object comment will store the id of the comment in post
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

module.exports.delete = function(req,res){
    Post.findById(req.query.id).then((post)=>{
        if(post.user == req.user.id){
 //There is another way of deleting comment shown in video
// Post.findByIdAndUpdate(req.query.id, $pull : {comment : req.query.cid}).then(post){return res.redirect('/)};
// This way we can remove the comment id directly from post db. Mangoose helps us..
            let index = post.comment.indexOf(req.query.cid);
            console.log(index);
            post.comment.splice(index,1);
            post.save();
            
            Comment.findById(req.query.cid).then((comment)=>{
                comment.deleteOne();
                return res.redirect('/');
            })
        }else{
            return res.redirect('back');
        }
       
    })
}
