const User = require('../model/user');

module.exports.profile =function(req,res){
    //res.end('<h1>User Profile</h1>');

    return res.render('user_profile',{
        title: 'Userprofile',
    });
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
    return res.redirect('/');
}

module.exports.destroysession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}