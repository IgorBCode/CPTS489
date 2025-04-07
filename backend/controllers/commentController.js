const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    try {
        const { content, postId } = req.body;

        const commment = new Comment({
            content,
            post: postId,
            author: req.user.id
        });

        await commment.save();
        res.status(201).json(commment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to post comment', errortype: err });
    }
};

exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .populate('author', 'username')
            .sort({ createdAt: -1});
        
            res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to laod comments' });
    }
};