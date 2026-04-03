
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getLocationFeedbacks,
  getAllFeedbacks,
  createFeedback,
} from '../controllers/feedbackController.js';
import {
  getFeedbacksByLocationSchema,
  getAllFeedbacksSchema,
  createFeedbackSchema,
} from '../validations/feedbackValidation.js';

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
  '/feedbacks',
  celebrate(getAllFeedbacksSchema, { abortEarly: false }),
  getAllFeedbacks,
);

export default router;
