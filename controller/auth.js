const { validationResult } = require('express-validator')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransporter({
    auth : {
        api_key: "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"
    }
}))

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
        return transporter.sendMail({
            to: email,
            from: 'vinayakg709@gmail.com',
            subject: 'signed up',
            html : '<h1>brooooooo... you are signed up </h1>'
        });
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
    const token = jwt.sign(
        {
            email: loadedUser.email,
            userId : loadedUser._id.toString()
        }, 
        'secret',
        {expiresIn: '1h'}
    );
    res.status(200).json({message: 'loggedin', token : token, userId: loadedUser._id.toString()  });
    console.log(200);
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
};

exports.posts = (req,res,next) => {
    res.send('<h1> hello </h1>');
}