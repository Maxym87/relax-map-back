// controllers/categoriesController.js

import { Region, LocationType } from "../models/location.js";

export const getAllRegions = async (req, res) => {
  const regions = await Region.find().sort({ region: 1 });
  res.status(200).json({
    total: regions.length,
    regions,
  });
};

export const getAllLocationTypes = async (req, res) => {
  const locationTypes = await LocationType.find().sort({ type: 1 });
  res.status(200).json({
    total: locationTypes.length,
    locationTypes,
  });
};
