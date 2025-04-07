const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    awards: [{
        type: String,
        default: []
    }]
}, { timestamps: true });

module.exports = mongoose.model('Board', BoardSchema);