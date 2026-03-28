import express from 'express';
import {
  createLocationController,
  updateLocationController,
} from '../controllers/locationController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';
import { validateImage } from '../middleware/validateImage.js';
import { validateBody } from '../middleware/validateBody.js';
import { isValidId } from '../middleware/isValidId.js';
import {
  createLocationSchema,
  updateLocationSchema,
} from '../validations/locations.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  upload.single('images'),
  validateImage,
  validateBody(createLocationSchema),
  createLocationController,
);

router.patch(
  '/:locationId',
  authenticate,
  isValidId('locationId'),
  upload.single('images'),
  validateImage,
  validateBody(updateLocationSchema),
  updateLocationController,
);

export default router;