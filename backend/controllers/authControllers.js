const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register new user
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', exact: `${err}` });
    }
};

// login user and create cookie to make sure that only logged in
// users can do certain things
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' })
        .json({ message: 'Login successful', user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict'
    });
    res.json({ message: 'Logged out'});
};

// get boards the user is subbed to 
exports.getUsersSubscriptions = async (req, res) => {
    const user = await User.findById(req.user.id).populate('subscriptions', 'name description');
    res.json({ subscriptions: user.subscriptions });
}