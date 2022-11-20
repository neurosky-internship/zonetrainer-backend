'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./controller');
/**
 * @swagger
 * tags:
 *   name: auth
 *   description: 구글 로그인
 */

/**
 * @swagger
 * /auth/google:
 *   post:
 *     description: 구글 로그인
 *     tags: [auth]
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */
router.post('/google', controller.authGoogle);


module.exports = router;
