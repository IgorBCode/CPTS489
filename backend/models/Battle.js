const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    boardA: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true
    },
    boardB: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true
    },
    startedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    startTime: {
        type: Date, default: Date.now
    },
    endTime: {
        type: Date,
        required: true
    },
    winner: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Board', default: null
    },
}, { timestamps: true });

module.exports = mongoose.model('Battle', battleSchema);