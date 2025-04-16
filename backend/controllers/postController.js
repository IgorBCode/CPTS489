const Post = require('../models/Post');
const Board = require('../models/Board');

exports.createPost = async (req, res) => {
    try {
        const { title, content, boardId, userId } = req.body;

        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ error: 'Board not found'});
        }

        const newPost = new Post({
            title,
            content,
            board: boardId,
            author: userId // req.user.id
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Error creating post', errortype: err });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('author', 'username')
        .populate('board', 'name')
        .sort({ createdAt: -1 }); // sort by newwest fist

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error loading all posts', errorttype: err });
    }
};

exports.getPostsByBoard = async (req, res) => {
    try {
        const { boardId } = req.params;

        const posts = await Post.find({ board: boardId })
            .populate('author', 'username')
            .sort({ createdAt: -1 }); // newwest posts first

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error loading posts', errortype: err });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Error loading post info', errortype: err });
    }
};

// allows user to upvote a post only once
exports.upvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
    
        const post = await Post.findById(postId);
    
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
    
        if (post.upvotedBy.includes(userId)) {
            return res.status(400).json({ error: 'Cannot upvote more than once' });
        }
    
        // if down voted then swap from down vote to upvote
        if (post.downvotedBy.includes(userId)) {
            post.downvotes--;
            post.downvotedBy = post.downvotedBy.filter(id => id.toString() !== userId);
        }
    
        post.upvotes++;
        post.upvotedBy.push(userId);
    
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Upvote failed', errortype: err });
    };
};

// same as upvote but with down votes
exports.downvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
    
        const post = await Post.findById(postId);
    
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
    
        if (post.downvotedBy.includes(userId)) {
            return res.status(400).json({ error: 'Cannot upvote more than once' });
        }
    
        // if down voted then swap from down vote to upvote
        if (post.upvotedBy.includes(userId)) {
            post.upvotes--;
            post.upvotedBy = post.upvotedBy.filter(id => id.toString() !== userId);
        }
    
        post.downvotes++;
        post.downvotedBy.push(userId);
    
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Downvote failed', errortype: err });
    }
};