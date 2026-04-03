// routes/userRoutes.js
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validateBody } from '../middleware/validateBody.js';
import { updateUserProfileSchema } from '../validations/usersEdit.js';

import {
  getCurrentUserController,
  getUserByIdController,
  getUserLocationsController,
  updateUserProfileController,
} from '../controllers/userController.js';

const router = Router();

router.get('/current', authenticate, getCurrentUserController);


router.get('/:userId', getUserByIdController);

router.get('/:userId/locations', getUserLocationsController);


router.patch(
  '/me',
  authenticate,
  validateBody(updateUserProfileSchema),
  updateUserProfileController
);

export default router;
