import { Router } from 'express'
import  {getOneUserById, getUsers} from '../controllers/userController'
import { checkTokenIfAdmin, authenticateToken} from '../middelware/authMiddleware'
const router = Router();

router.get('/:id', getOneUserById)

router.get('', authenticateToken, checkTokenIfAdmin, getUsers);

export default router;