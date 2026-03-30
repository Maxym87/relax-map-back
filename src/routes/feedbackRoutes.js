
import { celebrate } from 'celebrate';
import { Router } from 'express';
import getAllFeedbacksSchema from '../validation/getAllFeedbacksSchema.js'; 
import getFeedbacksByLocationSchema from '../validation/getFeedbacksByLocationSchema.js'; 
import createFeedbackSchema from '../validation/createFeedbackSchema.js'; 

import {
  getLocationFeedbacks,
  createFeedback,
  getAllFeedbacks, 
} from '../controllers/feedbacksController.js';

import { authenticate } from '../middlewares/authenticate.js'; 

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