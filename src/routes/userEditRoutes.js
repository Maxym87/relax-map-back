import express from 'express';
import { updateUserProfileController } from '../controllers/userEditController.js';
import { authenticate } from '../middleware/authenticateEdit.js';
import { validateBody } from '../middleware/validateBody.js';
import { updateUserProfileSchema } from '../validations/usersEdit.js';

const router = express.Router();

router.patch(
  '/users/me',
  authenticate,
  validateBody(updateUserProfileSchema),
  updateUserProfileController,
);

export default router;
