const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUserById = async (req, res) => {
    try {
        // get username and awards
        const user = await User.findById(req.params.id, 'username awards');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'User not found' });
    }
};

exports.changeUsername = async (req, res) => {
    try {
        const { newUsername } = req.body;

        // check if someone already has the user name
        const exists = await User.findOne({ username: newUsername });
        if (exists) {
            return res.status(400).json({ error: 'Username taken' });
        }

        await User.findByIdAndUpdate(req.user.id, { username: newUsername });
        res.json({ message: 'Username updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user name', errortype: err });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating password', errortype: err });
    }
};