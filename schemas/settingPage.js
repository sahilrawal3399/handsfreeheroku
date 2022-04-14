const mongoose = require('mongoose');

const settings = mongoose.Schema({
    websiteTitle: {
        type: String
    },
    homepageTitle: {
        type: String
    },
    homepageDescription: {
        type: String
    },
    leaderboardStatus: {
        type: Boolean,
        default: true
    },
    recordNo:{
        type: String,
        default:"record1"
    }
}, {
  timestamps: true
});


module.exports = mongoose.model('settingPage', settings);