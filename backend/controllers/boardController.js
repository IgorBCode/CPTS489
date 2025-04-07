const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newBoard = new Board({
            name,
            description,
            createdBy: req.user.id
        });

        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (err) {
        res.status(500).json({ error: 'Error creating board', errortype: err });
    }
};

exports.getAllBoards = async (req, res) => {
    try {
        const subs = await Board.find();
        res.json(subs);
    } catch (err) {
        res.status(500).json({ error: 'Error loading boards', errortype: err });
    }
}

exports.getBoardById = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.json(board);
    } catch (err) {
        res.status(500).json({ error: 'Error loading board info', errortype: err });
    }
};