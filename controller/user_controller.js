const User = require('../model/user');
const path = require('path');
const fs = require('fs');

module.exports.profile =function(req,res){
    //res.end('<h1>User Profile</h1>');
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile',{
            title: 'Userprofile',
            user_profile : user,
        });
    })
   
}

module.exports.Signup = function(req,res){
    return res.render('user_sign_up',{
        title: 'Signup',
    });
}

module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title : 'Signin',
    })
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}).then(function(err,user){
       if(err){console.log("Error in signing up"); return;}

        if(!user){
            User.create(req.body).then((user)=>{
                return res.redirect('/user/sign-in');
            }).catch((err)=>{ if(err){console.log("Error in creating a user"); return;}} )
        }
    })
}

module.exports.cretesession = function(req,res){
    req.flash('success','you have successfully logged in');
    return res.redirect('/');
}

module.exports.destroysession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Logged out successfully');
        return res.redirect('/');
      });
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
    //        return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
           
            User.uploadAvatar(req,res,function(err){
                    if(err){
                        console.log("**multer error",err);
                    }
                   // console.log(req.file);
                   user.name = req.body.name;
                   user.email = req.body.email;
                   if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar= User.avatarPath + '/' + req.file.filename;
                    user.save();
                    return res.redirect('back');
                   }
            })
          
        }catch(err){
            if(err){
                req.flash('error',err);
                return;
            }
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }

   
}