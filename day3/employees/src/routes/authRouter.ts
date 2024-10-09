import { Router } from 'express'

import { register, login} from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   get:
 *     tags: [Authentication]
 *     summary: register
 *     description: Registers a user.
 *     responses:
 *       200:
 *         description: user registered succsefully.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' 
 *         
 *     
 */
router.post('/register', register);

// /**
//  * @swagger
//  * /auth/login:
//  *   post:
//  *     tags: [Authorization]
//  *     summary: login
//  *     description: login and get a token
//  *     responses: 
//  *       200:
//  *         description: user logged in succsefully
//  *    requestBody:
//  *      
//  *     
//  */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     description: Log in a user with username and password to receive a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's username
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "securePassword123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login success message
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, invalid credentials
 */

router.post('/login', login);

export default router;