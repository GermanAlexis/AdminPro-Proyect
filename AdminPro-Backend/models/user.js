const { Schema, model } = require('mongoose')

const userSchema = Schema({

    name:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'User_Mortal'
    },
    google:{ type: Boolean}

});

module.exports = model('users', userSchema );