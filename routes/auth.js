const express = require('express');
const { body } = require('express-validator')
const user = require('../models/user');
const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth');
const passport = require('passport');

const router = express.Router();

router.post('/signup',[
    body('email')
    .isEmail()
    .withMessage('please enter a valid email')
    .custom((value,{req}) => {
        return User.findOne({ email : value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('email already exists');
            }
        })
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({ min : 5 }),
    body('name')
    .trim()
    .not()
    .isEmpty()
], authController.signup);

router.post('/login',authController.login);

router.get('/posts',isAuth, authController.posts);

router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}))

router.get('/google/redirect',passport.authenticate('google'), (req,res,next) => {
    res.send('you reached the calll back url');
})



module.exports = router;