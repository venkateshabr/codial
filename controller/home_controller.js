const Post = require('../model/posts');

module.exports.home = function(req,res){
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
    Post.find({})
    .populate('user')
    .populate({
        path : 'comment',
        populate : {
            path : 'user'
        }
    })
    .then((post)=>{
        return res.render('home',{
            title: 'home',
            post : post,
        });
    }).catch((err)=>{
        console.log('err :',err);
    })
}