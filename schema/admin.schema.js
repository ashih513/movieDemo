const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    token: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String,
        default: 'admin',
    }
}, { timestamps: true });

module.exports = AdminSchema;