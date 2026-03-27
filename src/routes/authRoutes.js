import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser } from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('auth/register', celebrate(registerUserSchema), registerUser);
router.post('auth/login', celebrate(loginUserSchema), loginUser);

export default router;
