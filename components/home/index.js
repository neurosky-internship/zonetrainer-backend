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

module.exports = router;
