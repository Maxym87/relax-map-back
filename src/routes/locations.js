import express from 'express';
import { createLocationController } from '../controllers/locationController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import { validateImage } from '../middlewares/validateImage.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createLocationSchema } from '../validations/locations.js';

const router = express.Router();

router.post(
  '/',
  authenticate,                 
  upload.single('images'),     
  validateImage,               
  validateBody(createLocationSchema), 
  createLocationController     
);

export default router;