const mongoose = require('mongoose');
const reviewSchema = require('./reviews.js')

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    founders: { type: String, required: false},
    about: { type: String, required: true },
    rating: { type: Number, required: true },
    location: { type: String, required: true },
    photo: { type: String, required: true },
    isFeatured: { type: Boolean, required: false },

    reviews: [reviewSchema]
});

module.exports = mongoose.model('Company', companySchema);