const mongoose = require('mongoose');

const survey = mongoose.Schema({
    surveyName: {
        type: String
    },
    description: {
        type: String,
        default: "active"
    },
    surveyStatus: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
  timestamps: true
});


module.exports = mongoose.model('survey', survey);