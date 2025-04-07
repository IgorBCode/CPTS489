const Battle = require('../models/Battle');
const User = require('../models/User');
const Board = require('../models/Board');
const Post = require('../models/Post');

exports.startBattle = async (req, res) => {
    try {
        const userId = req.user.id;
        const { boardA, boardB } = req.body;

        // battle cant fight itself
        if (boardA === boardB) {
            return res.status(400).json({ error: 'Board cant battle itself' });
        }

        const user = await User.findById(userId);
        // user has to be subscribed to one of the boards to start battle
        if (!user.subscriptions.includes(boardA) && !user.subscriptions.includes(boardB)) {
            return res.status(403).json({ error: 'You must be subscribed to one of these boards'});
        }

        const now = new Date();
        // make sure these 2 aren't battling alraedy
        const existingBattle = await Battle.findOne({
            $or: [
                { boardA, boardB },
                { boardA: boardB, boardB: boardA }
            ],
            endTime: { $gt: now } // currently active
        });

        if (existingBattle) {
            return res.status(400).json({ error: 'These 2 are already battling.' });
        }

        const newBattle = new Battle({
            boardA,
            boardB,
            startedBy: userId,
            startTime: now,
            endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // this works out to a week
        });

        await newBattle.save();
        res.status(201).json({ message: 'battle started.', battle: newBattle });
    } catch (err) {
        res.status(500).json({ error: 'Failed to start battle', errortype: err});
    }
};

exports.getAllBattles = async (req, res) => {
    try {
        const battles = await Battle.find()
            .populate('boardA', 'name')
            .populate('boardB', 'name')
            .populate('winner', 'name')
            .sort({ createdAt: -1 });
        
        res.json(battles);
    } catch (err) {
        return res.status(500).json({ error: 'Error loading battles', errortype: err });
    }
};

// get upvotes of boards in a battle
exports.getUpvotesDuringBattle = async (req, res) => {
    try {
        const battle = await Battle.findById(req.params.battleId);
        if(!battle) {
            return res.status(404).json({ error: 'Battle not found'});
        }

        const [boardAUpvotes, boardBUpvotes] = await Promise.all([
            Post.aggregate([
                {
                    $match: {
                        board: battle.boardA,
                        createdAt: { $gte: battle.startTime, $lte: battle.endTime }
                    }
                },
                {
                    $project: {
                        upvotes: { $ifNull: ['$upvotes', 0] }
                    }
                },
                { $group: {_id: null, total: { $sum: '$upvotes' }}}
            ]),
            Post.aggregate([
                {
                    $match: {
                        board: battle.boardB,
                        createdAt: { $gte: battle.startTime, $lte: battle.endTime }
                    }
                },
                { $group: { _id: null, total: { $sum: '$upvotes' }}}
            ])
        ]);

        res.json({
            boardA: boardAUpvotes[0]?.total || 0,
            boardB: boardBUpvotes[0]?.total || 0
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to count upvotes' });
    }
};