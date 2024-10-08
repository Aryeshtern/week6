import { Router} from 'express';
import { registerUser, loginUser, addGame } from '../controllers/uesrController';
import { authenticateToken} from '../middelware/authMiddleware'

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/games',authenticateToken, addGame)

export default router;
