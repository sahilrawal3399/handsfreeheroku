const mongoose = require('mongoose');

const surveyResponseData = mongoose.Schema({
    surveyId: {
        type: String,
        required : true
    },
    userId: {
        type: String,
        required: true
    },
    ansData: {
        type: Object,
        required:true
    }
}, {
  timestamps: true
});


module.exports = mongoose.model('surveyResponseData', surveyResponseData);