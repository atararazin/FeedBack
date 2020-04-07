
const passport = require('passport');
const GoogleStrgedy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser( 
    (user, done) => 
    {
        done(null, user.id);
    }
);

passport.deserializeUser( 
    (id,done) => 
    {
        User.findById(id).then(user => 
            {
                done(null, user);
            }
            )
    } 
);

passport.use(new GoogleStrgedy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',//our return path from google
        //proxy: true
    }, (accessToken, refreshToken, profile, done) =>
        {
            console.log("---connected to server---");
            User.findOne({googleId: profile.id}).then((existingUser)=>{
                if(existingUser){

                    done(null, existingUser);
                }
                else{
                    new User({ googleId: profile.id }).save().then(user => done(null, user));//create new user
                }
            })
        }
)
);
