const Post = require('../model/posts');
const User = require('../model/user');

module.exports.home = async function(req,res){
    //return res.end('<h1>Express is up and running</h1>');
    // Post.find({}).then((post)=>{
    //     return res.render('home',{
    //         title: 'home',
    //         post : post,
    //     });
    // }).catch((err)=>{
    //     console.log('err :',err);
    // })
    
    //populating the user to get the object.
    try{
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comment',
            populate : {
                path : 'user'
            }
        })
        
        let user = await  User.find({});
        return res.render('home',{
            title: 'home',
            post : post,
            all_users : user
        });
    }catch(err){
        console.log('Error',err);
    }
   
}