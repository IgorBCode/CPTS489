const Post = require('../models/Post');
const Board = require('../models/Board');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
    try {
        const { title, content, boardId } = req.body;
        const userId = req.user.id;

        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ error: 'Board not found'});
        }

        const newPost = new Post({
            title,
            content,
            board: boardId,
            author: userId
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Error creating post', errortype: err });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const userId = req.user?.id;

        const posts = await Post.find()
        .populate('author', 'username')
        .populate('board', 'name')
        .sort({ createdAt: -1 }) // sort by newwest fist
        .lean();

        // this will get information on if the user upvoted the post or not
        for (const post of posts) {
            post.userVote = null;
            if (userId) {
                if (post.upvotedBy?.some(id => id.toString() === userId)) {
                    post.userVote = 'up';
                } else if (post.downvotedBy?.some(id => id.toString() === userId)) {
                    post.userVote = 'down';
                }
            }

            post.commentCount = await Comment.countDocuments({ post: post._id });
        }
        
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error loading all posts', errorttype: err });
    }
};


exports.getPostsByBoard = async (req, res) => {
    try {
        const { boardId } = req.params;
        const userId = req.user?.id;

        const posts = await Post.find({ board: boardId })
            .populate('author', 'username')
            .populate('board', 'name')
            .sort({ createdAt: -1 })
            .lean(); // allows us to modify post objects

        const postIds = posts.map(post => post._id);

        // Get comment counts per post
        const commentCounts = await Comment.aggregate([
            { $match: { post: { $in: postIds } } },
            { $group: { _id: '$post', count: { $sum: 1 } } }
        ]);

        const countMap = {};
        commentCounts.forEach(c => {
            countMap[c._id.toString()] = c.count;
        });

        for (const post of posts) {
            post.commentCount = countMap[post._id.toString()] || 0;
        }

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error loading posts', errortype: err });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username')
            .populate('board', 'name')
            .lean();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Error loading post info', errortype: err });
    }
};

// handle votes
exports.votePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { type } = req.body; // 'up', 'down', or 'none'
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Remove previous vote if exists
        const hadUpvoted = post.upvotedBy.includes(userId);
        const hadDownvoted = post.downvotedBy.includes(userId);

        if (hadUpvoted) {
            post.upvotes--;
            post.upvotedBy = post.upvotedBy.filter(id => id.toString() !== userId);
        }

        if (hadDownvoted) {
            post.downvotes--;
            post.downvotedBy = post.downvotedBy.filter(id => id.toString() !== userId);
        }

        // Add new vote
        if (type === 'up') {
            post.upvotes++;
            post.upvotedBy.push(userId);
        } else if (type === 'down') {
            post.downvotes++;
            post.downvotedBy.push(userId);
        } else if (type !== 'none') {
            return res.status(400).json({ error: 'Invalid vote type' });
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Voting failed', errortype: err });
    }
};