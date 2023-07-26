const Like = require('../model/likes');
const Post = require('../model/posts');
const Comment = require('../model/comments');

module.exports.togglelike = async function(req,res){
    //we are getting the data via query
  //try{
        let likable;
        let deleted = false;
    
        if(req.query.type == 'Post'){
            likable = await Post.findById(req.query.id).populate('like');
        }else{
            likable = await Comment.findById(req.query.id).populate('like');
        }
      
        let existinglike = await Like.findOne({
            user : req.user._id,
            likable : req.query.id,
            onModel : req.query.type
        });
    
        if(existinglike){
            likable.like.pull(existinglike._id);
            likable.save();
    
            existinglike.deleteOne();
            deleted = true;
        }else{
            let like = await Like.create({
                user : req.user._id,
                likable : req.query.id,
                onModel : req.query.type
            });

        likable.like.push(like);
        likable.save();
        }
        let length = likable.like.length;
        return res.json(200,{
            message : "liked Successfully",
            data : {
                deleted : deleted,
                length : length,
            }
        })
    // }catch(err){
    //     if(err){
    //         console.log('error',err);
    //         return res.json(500,{
    //             message : "Internal server error",
    //         })
    //     }
    // }
  
}