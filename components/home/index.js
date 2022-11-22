'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./controller');
/**
 * @swagger
 * tags:
 *   name: home
 *   description: 홈 데이터
 */

/**
 * @swagger
 * /home:
 *   post:
 *     description: 측정 데이터 저장하기
 *     tags: [home]
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/homeRequest'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomeResponse'
 */
router.post('/', controller.addData);

/**
 * @swagger
 * /home/recentData/:userId:
 *   get:
 *     description: 최근 데이터 불러오기
 *     tags: [home]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 */
router.get('/recentData/:userId', controller.getRecentData);

/**
 * @swagger
 * /home/graphData/:userId:
 *   get:
 *     description: attention, meditation 데이터 불러오기
 *     tags: [home]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GraphResponse'
 */
router.get('/graphData/:userId', controller.getGraphData);

module.exports = router;
