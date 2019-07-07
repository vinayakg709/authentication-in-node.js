const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const passportSetup = require('./middleware/passport-setup');
const cookieSession = require('cookie-session');
const key = require('./middleware/key');
const passport = require('passport');


const authRoutes = require('./routes/auth');

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 23*60*60*1000,
    keys: key.session.cookieKey
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://vinayak:Gv9yXEr5RamY9ydM@cluster0-ayowj.mongodb.net/auth?retryWrites=true&w=majority')
.then(result => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
})
