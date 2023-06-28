const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    revName: {
        type: String,
        required: true
    },
    revRating: {
        type: Number,
        required: true
    },
    revDescription: {
        type: String,
        required: true
    },
  
    revDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = reviewSchema;