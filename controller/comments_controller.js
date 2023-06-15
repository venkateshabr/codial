const Comment = require('../model/comments');
const Post = require('../model/posts');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                //even if we write req.user it will get the objectid correctly
                user  : req.user._id,
                post : req.body.post
            });
        
       
        //console.log(comment);
        //push the object comment will store the id of the comment in post
        post.comment.push(comment);
        post.save();
       
        if(req.xhr){
            comment = await comment.populate('user','name');
            return res.status(200).json({
                data : {
                    comment : comment,
                    post : post
                },
                message :"comment created successfully"
            });
        }
        req.flash('success','Comment Added Successfully')
        return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err)
        console.log('Error',err);
        return;
    }
}

module.exports.delete = async function(req,res){

    try{
        let post = await Post.findById(req.query.id)
        
        //There is another way of deleting comment shown in video
        // Post.findByIdAndUpdate(req.query.id, $pull : {comment : req.query.cid}).then(post){return res.redirect('/)};
        // This way we can remove the comment id directly from post db. Mangoose helps us..
                
                
        Comment.findById(req.query.cid);
        let index = post.comment.indexOf(req.query.cid);
        console.log(index);
        post.comment.splice(index,1);
        post.save();
        comment.deleteOne();
        if(req.xhr){
            return res.json(200,{
                data : {
                    comment_id : req.query.cid
                },
                message:'comment deleted'
            })
        }
        req.flash('success','Comment deleted Successfully');
        return res.redirect('/');

    }catch(err){
        req.flash('error',err);
        console.log('Error',err);
        return;
    } 
}
