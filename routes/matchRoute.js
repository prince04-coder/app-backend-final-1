// const express = require('express');
// const router = express.Router();
// const { startMatchmaking } = require('../controllers/match/matchController');
// const User = require('../models/User');

// // Route to manually trigger the matchmaking process
// router.post('/matchmaking', async (req, res) => {
//   try {
//     await startMatchmaking();
//     res.status(200).json({ message: 'Matchmaking process started successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error starting matchmaking process' });
//   }
// });

// // Route to get the matches for a particular user
// router.get('/matches-found/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId).populate('matches', 'name gender quizAnswers');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({
//       message: 'Matches retrieved successfully',
//       matches: user.matches
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching user matches' });
//   }
// });

// module.exports = router;








const express = require('express');
const router = express.Router();
const { startMatchmaking } = require('../controllers/match/matchController');
const User = require('../models/User');

/**
 * @swagger
 * /match/matchmaking:
 *   post:
 *     summary: Start the matchmaking process
 *     description: Manually triggers the matchmaking process for users.
 *     responses:
 *       200:
 *         description: Matchmaking process started successfully.
 *       500:
 *         description: Error starting matchmaking process.
 */
router.post('/matchmaking', async (req, res) => {
  try {
    await startMatchmaking();
    res.status(200).json({ message: 'Matchmaking process started successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error starting matchmaking process' });
  }
});

/**
 * @swagger
 * /match/matches-found/{userId}:
 *   get:
 *     summary: Get matches for a specific user
 *     description: Retrieves the matches found for a particular user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose matches are being retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matches retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Matches retrieved successfully
 *                 matches:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       gender:
 *                         type: string
 *                         enum: [male, female]
 *                         example: male
 *                       quizAnswers:
 *                         type: array
 *                         items:
 *                           type: integer
 *                           example: 1
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error fetching user matches.
 */
router.get('/matches-found/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('matches', 'name gender quizAnswers');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Matches retrieved successfully',
      matches: user.matches
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user matches' });
  }
});

module.exports = router;