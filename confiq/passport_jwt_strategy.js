const passport = require('passport');

const jwtStrategy= require('passport-jwt').Strategy;
const extractJwt =  require('passport-jwt').ExtractJwt;

const User = require('../model/user');


let opts = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}).then((user)=>{

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            
        }
    }).catch((err)=>{
        if (err) {
            return done(err, false);
        }
    });

}));

module.exports = passport;