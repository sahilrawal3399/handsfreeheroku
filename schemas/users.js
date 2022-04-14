const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {
        type: String
    },
    username:{
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String
    },
    imgsrc: {
        type: String,
        default: 'default.jpg'
    },
    surveyAttend: {
        type: Number,
        default:0
    },
    points: {
        type: Number,
        default:0
    },
    followers: {
        type: Number,
        default:0
    },
    following: {
        type: Number,
        default:0
    },
    isDeleted: {
        type: Boolean,
        default:false
    },
    isBlock: {
        type: Boolean,
        default:false
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    github: {
        type: String
    },
    website: {
        type: String
    },
    
}, {
  timestamps: true
});


module.exports = mongoose.model('users', user);

