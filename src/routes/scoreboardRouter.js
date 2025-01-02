const router = require("express").Router();

const ScoreboardController = require("../controllers/ScoreboardController");
const scoreboardMiddleware = require("../middleware/scoreboardMiddleware");
const checkToken = require("../middleware/checkToken");

/**
 * @swagger
 * tags:
 *   - name: Scoreboard
 *     description: Scoreboard related operations
 */
/**
 * @swagger
 * /scoreboard:
 *   get:
 *     summary: List all Scoreboard
 *     tags: [Scoreboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List all Scoreboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da tarefa
 *                     example: 1
 *                   code:
 *                     type: integer
 *                     description: Scoreboard code
 *                     example: 98765
 *                   name:
 *                     type: string
 *                     description: Name Game
 *                     example: Christmas Game.
 *                   description:
 *                     type: string
 *                     description: Game Description
 *                     example: Christmas Game.
 *                   sport_type:
 *                     type: string
 *                     description: Game type
 *                     example: Tennis.
 */

router.get("/scoreboard", checkToken, ScoreboardController.getAll);

/**
 * @swagger
 * /scoreboard/{id}:
 *   get:
 *     summary: Get details of a specific scoreboard
 *     tags: [Scoreboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID scoreboard
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Scoreboard found
 *       404:
 *         description: Scoreboard not found
 */
router.get(
  "/scoreboard/:id",
  checkToken,
  scoreboardMiddleware.validateScoreboardExist,
  ScoreboardController.getOne
);

/**
 * @swagger
 * /scoreboard:
 *   post:
 *     summary:  Create a new scoreboard
 *     tags: [Scoreboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 98765
 *               name:
 *                 type: string
 *                 example: Christmas Game.
 *               description:
 *                 type: string
 *                 example: Christmas Game.
 *               sport_type:
 *                 type: string
 *                 example: Soccer.
 *     responses:
 *       201:
 *         description: Scoreboard created successfully
 *       400:
 *         description: Invalid data
 */
router.post(
  "/scoreboard",
  checkToken,
  scoreboardMiddleware.validateCodeExist,
  ScoreboardController.register
);

/**
 * @swagger
 * /scoreboard/{id}:
 *   put:
 *     summary: Update a scoreboard
 *     tags: [Scoreboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID scoreboard
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 98765
 *               name:
 *                 type: string
 *                 example: Christmas Game.
 *               description:
 *                 type: string
 *                 example: Christmas Game.
 *               sport_type:
 *                 type: string
 *                 example: Tennis.
 *     responses:
 *       200:
 *         description: Scoreboard updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Scoreboard not found
 */
router.put(
  "/scoreboard/:id",
  checkToken,
  scoreboardMiddleware.validateScoreboardExist,
  ScoreboardController.update
);

/**
 * @swagger
 * /scoreboard/{id}:
 *   delete:
 *     summary: Delete an existing scoreboard
 *     tags: [Scoreboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID scoreboard
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Scoreboard deleted successfully
 *       404:
 *         description: Scoreboard not found
 */
router.delete(
  "/scoreboard/:id",
  checkToken,
  scoreboardMiddleware.validateScoreboardExist,
  ScoreboardController.delete
);

module.exports = router;
