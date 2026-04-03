import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser, logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticateEdit.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/refresh', refreshUserSession);
router.post('/logout', authenticate, logoutUser);


export default router;
