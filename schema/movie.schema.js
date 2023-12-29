const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
 
const MovieSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    publishYear: {
        type: String,
        required: false
    },
    is_deleted:{
        type: String,
        enum : [0,1],
        default: 0
    }
}, { timestamps: true });
 
module.exports = MovieSchema;