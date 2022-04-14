const mongoose = require('mongoose');

const questions = mongoose.Schema({
    question: {
        type: String
    },
    answerType: {
      type: String
    },
    parent: {
      type: Boolean
    },
    surveyId: {
      type: String
    },
    queOrder: {
      type: Number
    },
    parentQueId: {
      type: String
    },
    parentOption: {
      type: String
    },
    options: {
      type: Array
    }
}, {
  timestamps: true
});


module.exports = mongoose.model('questions', questions);

