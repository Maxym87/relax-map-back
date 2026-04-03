// routes/categoriesRoutes.js

import { Router } from "express";
import {  getAllRegions, getAllLocationTypes } from "../controllers/categoriesController.js";

const router = Router();

router.get('/api/categories/regions', getAllRegions);
router.get('/api/categories/location-types', getAllLocationTypes);

export default router;
