// used to keep track of users subscriptions
// user can subscribe to 3 boards at most

const User = require('../models/User');
const Board = require('../models/Board');

exports.subscribeToBoard = async (req, res) => {
    try {
        const userId = req.user.id;
        const { boardId } = req.body;

        const user = await User.findById(userId);
        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }

        // check if subbed
        if (user.subscriptions.includes(boardId)) {
            return res.status(400).json({ error: 'Already subscribed to board' });
        }

        // check sub limit
        if (user.subscriptions.lenght >= 3) {
            return res.status(400).json({ error: 'Subbed to max amount of boards (3)' });
        }

        user.subscriptions.push(boardId);
        await user.save();

        res.json({ message: `Subscribed to ${board.name}`, subscriptions: user.subscriptions });
    } catch (err) {
        res.status(500).json({ error: 'Sub failed' });
    };
}

exports.unsubscribeFromBoard = async (req, res) => {
    try {
        const userId = req.user.id;
        const { boardId } = req.body;

        const user = await User.findById(userId);

        if (!user.subscriptions.includes(boardId)) {
        return res.status(400).json({ error: 'You are not subscribed to this board' });
        }

        user.subscriptions = user.subscriptions.filter(id => id.toString() !== boardId);
        await user.save();

        res.json({ message: 'Unsubscribed', subscriptions: user.subscriptions });
    } catch (err) {
        res.status(500).json({ error: 'Failed to unsubscribe' });
    }
};