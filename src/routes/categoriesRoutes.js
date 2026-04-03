// routes/categoriesRoutes.js

import { Router } from "express";
import {  getAllRegions, getAllLocationTypes } from "../controllers/categoriesController.js";

const router = Router();

router.get('/regions', getAllRegions);
router.get('/location-types', getAllLocationTypes);

export default router;
