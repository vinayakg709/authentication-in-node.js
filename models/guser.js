const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    googleId : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Guser',guserSchema);