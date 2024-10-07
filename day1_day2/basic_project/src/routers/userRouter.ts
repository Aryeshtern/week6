import { Router} from 'express';
import { registerUser } from '../controllers/uesrController';

const router = Router();

router.post('/register', registerUser);

export default router;