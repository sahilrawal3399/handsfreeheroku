const mongoose = require('mongoose');

const verificationTokens = mongoose.Schema({
    userEmail: {
        type: String,
        required : true
    },
    userId: {
        type: String,
        required : true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date,
        expires: '10m',
        default: Date.now 
    }
}, 
    {
  timestamps: true
});


module.exports = mongoose.model('verificationTokens', verificationTokens);