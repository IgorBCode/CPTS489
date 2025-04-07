const express = require('express'); 
const router = express.Router();
const { endBattles } = require('../jobs/battleChecker');
const { 
        startBattle, 
        getAllBattles,
        getUpvotesDuringBattle
     } = require('../controllers/battleController');

const verifyToken = require('../middleware/authMiddleware');

router.post('/start', verifyToken, startBattle);
router.post('/end-battles', verifyToken, endBattles);
router.get('/all', getAllBattles);
router.get('/upvotes/:battleId', getUpvotesDuringBattle);

module.exports = router;