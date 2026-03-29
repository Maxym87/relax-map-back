
import { celebrate } from 'celebrate';
import { Router } from 'express';
import getAllFeedbacksSchema from '../schemas/getAllFeedbacksSchema.js'; // 🔧 добавили
import getFeedbacksByLocationSchema from '../schemas/getFeedbacksByLocationSchema.js'; // 🔧 оставили
import createFeedbackSchema from '../schemas/createFeedbackSchema.js'; // 🔧 оставили

import {
  getLocationFeedbacks,
  createFeedback,
  getAllFeedbacks, // 🔧 добавили (его нет в dev)
} from '../controllers/feedbacksController.js';

import { authenticate } from '../middlewares/authenticate.js'; // 🔧 оставили

const router = Router();

router.get(
  '/api/locations/:locationId/feedbacks',
  celebrate(getFeedbacksByLocationSchema, { abortEarly: false }),
  getLocationFeedbacks,
);

router.post(
  '/api/locations/:locationId/feedbacks',
  authenticate,
  celebrate(createFeedbackSchema, { abortEarly: false }),
  createFeedback,
);

router.get(
  '/api/feedbacks',
  celebrate(getAllFeedbacksSchema, { abortEarly: false }),
  getAllFeedbacks,
);

export default router;