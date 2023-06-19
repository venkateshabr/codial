const passport = require('passport');
const passport_google_oauth = require('passport-google-oauth').OAuth2Strategy;
const User = require('../model/user');
const crypto = require('crypto');

passport.use(new passport_google_oauth({
    clientID :'447002925708-96nm71gk3ess7acfo9njivpubrasbs69.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : 'http://localhost:8000/user/auth/google/callback',

},function verify(accesstoken,refereshtoken,profile,cb){
    User.findOne({email : profile.emails[0].value}).then((user)=>{
        if(user){
            return cb(null, user);
        }else{
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex'),
            }).then((user)=>{
                return cb(null, user);
            }).catch((err)=>{
                if(err){
                    console.log("Error in creating the user",err);
                    return;
                }
            })           
        }
    }).catch((err)=>{
        if(err){
            console.log("Error in passport googlr OAuth",err);
        }
    })
}
));

module.exports = passport;

