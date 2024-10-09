import { Router } from 'express'
import  {getOneUserById} from '../controllers/usercontroller'
const router = Router();

router.get('/:id', getOneUserById)

export default router;