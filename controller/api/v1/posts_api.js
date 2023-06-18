const Post = require('../../../model/posts');
const Comment = require('../../../model/comments');
module.exports.index = async function(req,res){

    // Populating the post by removing the passwords.
    let post = await Post.find({})
    .sort('-createdAt')
    .populate({
        path : 'user',
        select:'-password'
        })
    .populate({
        path : 'comment',
        populate : {
            path : 'user',
            select:'-password'
        }
    })
 
    return res.json(200,{
        message: "api is working fine",
        post : post
    })
}

module.exports.destroy = async function(req,res){
    try{
        let post =  await Post.findById(req.params.id)
            // .id instead of ._id will automatically helps us compare with post.user which is objectid
            // or else we need to convert post.user to string
            if(post.user == req.user.id){
                post.deleteOne();
                Comment.deleteMany({post : req.params.id})
                return res.json(200,{
                    message: "Posts and associated comments are deleted",
                })
                
               
            }else{
                return res.json(401,{
                    message : 'you cannot delete the post'
                })
            }    
      
    }catch(err){
  
            console.log('Error in removing the commments of the post : ',err);
            return res.json(500,{
                message: "Internal Server errro",
            })
     
    }
   
}