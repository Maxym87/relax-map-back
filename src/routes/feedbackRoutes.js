//import express from 'express';
import { celebrate } from 'celebrate';
import { Router } from 'express';
import getAllFeedbacksSchema from '../schemas/getAllFeedbacksSchema.js';
import getFeedbacksByLocationSchema from '../schemas/getFeedbacksByLocationSchema.js';
import createFeedbackSchema from '../schemas/createFeedbackSchema.js';
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