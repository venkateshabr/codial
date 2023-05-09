const Post = require('../model/posts');

module.exports.createpost = function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }).then((post)=>{     
        return res.redirect('back');
    }).catch((err)=>{
        if(err){
        console.log('err : ',err);
        return;
        }
    });
}