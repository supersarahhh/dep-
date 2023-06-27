const mongoose = require('mongoose');
require('dotenv').config()
const mongodbUri = process.env.MONGODBURI;

mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

module.exports = {
    Companies: require('./company'),
    seedProducts: require('./seed')
}
