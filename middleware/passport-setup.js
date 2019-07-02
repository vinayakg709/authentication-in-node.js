const  passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const key = require('../middleware/key')

passport.use(
    new googleStrategy({
        callbackURL : '/auth/google/redirect',
        clientID: key.google.clientId,
        clientSecret : key.google.clientSecret
    },
    (accessToken,refreshToken,profile,done) => {
        console.log('callback function is fired');
        console.log(profile);
    })
)