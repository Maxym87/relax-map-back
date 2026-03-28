import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';//Підключити реальний middleware, коли він буде готовий
import { getCurrentUserController,getUserByIdController,getUserLocationsController} from '../controllers/userController.js';

const router = Router();

router.get('/current', authenticate, getCurrentUserController);
router.get('/:userId', getUserByIdController);
router.get('/:userId/locations', getUserLocationsController);
export default router;
