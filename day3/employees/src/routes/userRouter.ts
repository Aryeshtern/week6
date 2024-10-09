import { Router } from 'express'
import  {getOneUserById, getUsers} from '../controllers/userController'
import { checkTokenIfAdmin, authenticateToken} from '../middelware/authMiddleware'
const router = Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     tags: [Employees]
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authenticateToken, checkTokenIfAdmin, getUsers);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags: [Employees] 
 *     summary: Get one user by ID
 *     description: Retrieve an object representing a user.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' 
 *       404:
 *         description: User not found.
 *       403:
 *         description: Forbidden, insufficient permissions.
 */
router.get('/:id', getOneUserById)

export default router;