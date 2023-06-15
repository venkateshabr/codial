const Post = require('../model/posts');
const Comment = require('../model/comments');
const User = require('../model/user');

module.exports.createpost = async  function(req,res){
    try{
        let post = await Post.create({
        content : req.body.content,
        user : req.user._id
        });
       
        if(req.xhr){
            post = await post.populate('user','name'); 
            return res.status(200).json({
                // data : {
                //     post : post
                // } ,
                data : post,
                message : "Post is created"
            });
        }

        req.flash('success','post published')    
        return res.redirect('/');
    }catch(err){
        if(err){
        req.flash('error',err);
        return;
        }
    };
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then((post)=>{
        // .id instead of ._id will automatically helps us compare with post.user which is objectid
        // or else we need to convert post.user to string
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post : req.params.id}).catch((err)=>{
                console.log('Error in removing the commments of the post : ',err);
                req.flash('error','you cannot delete the potst!')
                res.redirect('back');
            });

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : 'post and all associated comments are deleted',
                    
                })
            }
            req.flash('success','Post and all associated comments are deleted successfully');

            res.redirect('/');
        }else{
            res.redirect('back');
        }
    })
}