const cron = require('node-cron');
const Board = require('../models/Board');
const Battle = require('../models/Battle');
const User = require('../models/User');
const Post = require('../models/Post');
const awards = require('../config/awards.json');

// select a random prize and give it to the board
// and all the subs of that board
async function giveWinnerAward(winnerBoardId) {
    const award = awards[Math.floor(Math.random() * awards.length)];

    // give the board an award
    await Board.findByIdAndUpdate(winnerBoardId, {
        $push: { awards: award }
    });

    // give subs the award
    await User.updateMany(
        { subscriptions: winnerBoardId },
        { $push: { awards: award }}
    );
}

async function determineWinner(b) {
    const battle = await Battle.findByIdAndUpdate(b._id);
    if(!battle) {
        return res.status(404).json({ error: 'Battle not found'});
    }
    // cout all the votes from posts in a board that are within the time peroid
    // of the battle.
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
            {
                $project: {
                    upvotes: { $ifNull: ['$upvotes', 0] }
                }
            },
            { $group: { _id: null, total: { $sum: '$upvotes' }}}
        ])
    ]);

    const scoreA = boardAUpvotes[0]?.total || 0;
    const scoreB = boardBUpvotes[0]?.total || 0;
    

    // nothing is returned if its a tie
    if (scoreA === scoreB) return null;
    // find winner and give them prize

    return scoreA > scoreB ? battle.boardA : battle.boardB;
}

// stop all ongonig battles
async function endBattles() {
    const now = new Date();
    const battles = await Battle.find({
        endTime: {$gt: now},
        winner: null
    });

    // change end time of all ongoing battles to now
    for (const battle of battles) {
        battle.endTime = now;
        const winnerId = await determineWinner(battle);
        battle.winner = winnerId || null;
        await battle.save();
        // give prizes
        if (battle.winner) {
            await giveWinnerAward(battle.winner);
        }

        console.log('Battles force stopped');
    }
}

// check battles every hour to see if any have ended
const checkBattles = () => {
    cron.schedule('0 * * * *', async () => {
    console.log('Checking battles');

    try {
        const now = new Date();
        const endedBattles = await Battle.find({
        endTime: { $lte: now },
        winner: null
        });

        for (const battle of endedBattles) {
        const winnerId = await determineWinner(battle);

        battle.winner = winnerId || null;
        await battle.save();
        if (battle.winner) {
            await giveWinnerAward(battle.winner);
        }

        }
    } catch (err) {
        console.error('[Battle Checker] Error checking battles:', err);
    }
    });
};

module.exports = { checkBattles, endBattles };