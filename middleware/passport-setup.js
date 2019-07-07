const  passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const key = require('../middleware/key');
const Guser = require('../models/guser');

passport.use(
    new googleStrategy({
        callbackURL : '/auth/google/redirect',
        clientID: key.google.clientId,
        clientSecret : key.google.clientSecret
    },
    (accessToken,refreshToken,profile,done) => {
        console.log('callback function is fired');
        console.log(profile);

        Guser.findOne({googleId: profile.id})
        .then(currentUser => {
            if(currentUser){
                console.log('user already exists and user is' + currentUser)
            }
            else {
                const guser = new Guser({
                    name : profile.displayName,
                    googleId: profile.id
                });
        
                guser.save().then(result => {
                    console.log(result)
                })
            }
        })
        
    })
)