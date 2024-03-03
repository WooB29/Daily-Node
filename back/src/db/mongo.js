const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/daily', { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error on MongoDB connection:", err);
    });

const mgdb = mongoose.connection;

mgdb.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = mgdb;