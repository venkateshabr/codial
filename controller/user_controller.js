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

}

module.exports.cretesession = function(req,res){

}