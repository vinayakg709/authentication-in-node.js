const  passport = require('passport');
const googleStrategy = require('passport-google-oauth20');

passport.use(
    new googleStrategy({
        callbackURL : '/auth/google/redirect',
        clientID: '85689967573-ilb0v2hhbqhlebmdb5p9c66r3i12bcgp.apps.googleusercontent.com',
        clientSecret : 'yGQJVAhhPU3SyMw13yjKLKPl'
    },
    (accessToken,refreshToken,profile,done) => {
        console.log('callback function is fired');
        console.log(profile);
    })
)