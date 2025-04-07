const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    board: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Board',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0
    },
    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);