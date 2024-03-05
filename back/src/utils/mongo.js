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

/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
},
{
    versionKey: false,
});

module.exports = mongoose.model('Todo', todoSchema);
*/

module.exports = mgdb;