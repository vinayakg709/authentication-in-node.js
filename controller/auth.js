const { validationResult } = require('express-validator')
const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.signup = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        const error = new Error( ' validation failed ' );
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,12)
    .then(hashedPw => {
        const user = new User({
            email: email,
            password: hashedPw,
            name : name
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({ message: 'User Created', userId: result._id});
        console.log("201");
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    });
};


exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email : email})
    .then(user => {
        if(!user){
            const error = new Error('no such email exists');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('password not matched');
            error.statusCode = 401;
            throw error;
        }
        
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
}