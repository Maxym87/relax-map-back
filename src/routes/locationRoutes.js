import { Router } from 'express';
import {
  getLocationsController,
  getLocationByIdController,
} from '../controllers/locationController.js';

const locationRouter = Router();

locationRouter.get('/', getLocationsController);
locationRouter.get('/:id', getLocationByIdController);

export default locationRouter;
