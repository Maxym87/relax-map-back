// routes/locationsRoutes.js
import { Router } from 'express';

import {
  getLocationsController,
  getLocationByIdController,
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

const router = Router();

router.get('/', getLocationsController);
router.get('/:id', isValidId('id'), getLocationByIdController);

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
