const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/auth');

app.use(bodyParser.json());

app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://vinayak:Gv9yXEr5RamY9ydM@cluster0-ayowj.mongodb.net/auth?retryWrites=true&w=majority')
.then(result => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
})
