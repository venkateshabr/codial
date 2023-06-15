const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true,
    },
    function(req,email,password,done){
        User.findOne({email : email}).then((user)=>{

            if(!user || user.password != password){
                req.flash('error','Invalid Username/password');
                return done(null,false);
            }
            
            return  done(null,user);
        }).catch((err)=>{
            req.flash('error',err);
           // console.log("Error in finding user --> passport")
            return done(err);
        })
    }
));


//serializing user
passport.serializeUser(function(user,done){
    return done(null,user.id);
})

//deserializing user
passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        if(user){
            return done(null,user);
       }
   }).catch((err)=>{
        console.log("Error in finding user --> passport");
        return done(err);
   })
});


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect('/user/sign-in');
}

passport.setAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the information of the current signed in user in cookies, we are sending this in views
        res.locals.user = req.user
    }
    return next();
}

passport.checkSignedin = function(req,res,next){
    if(req.isAuthenticated()){
      return res.redirect('/user/profile');
    }
    return next();
}

module.exports = passport;