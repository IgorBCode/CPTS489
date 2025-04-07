const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { checkBattles } = require('./jobs/battleChecker');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

// static html files for testing
// remove this to see raw json data
app.use(express.static('public'));

// authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// board routes
const boardRoutes = require('./routes/boardroute');
app.use('/api/boards', boardRoutes);

// subscription routes
const subscriptionRoutes = require('./routes/subscription');
app.use('/api/subscriptions', subscriptionRoutes);

// post routes
const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

// comment routes
const commentRoutes = require('./routes/comment');
app.use('/api/comments', commentRoutes);

// start battle route
const battleRoutes = require('./routes/battleroute');
app.use('/api/battles', battleRoutes);

// user routes
const userRoutes = require('./routes/userroute');
app.use('/api/users', userRoutes);

// this will run every hour to check if there are winners of a board battle
checkBattles();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error.', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('So far so good');
