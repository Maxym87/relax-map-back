import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { getLocations, getLocationById } from '../services/locationService.js';

export const getLocationsController = async (req, res) => {
  const { page, limit, region, type, search } = req.query;

  if (region && !mongoose.Types.ObjectId.isValid(region)) {
    throw createHttpError(400, 'Invalid region id');
  }

  if (type && !mongoose.Types.ObjectId.isValid(type)) {
    throw createHttpError(400, 'Invalid type id');
  }

  const data = await getLocations({
    page,
    limit,
    region,
    type,
    search,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found locations!',
    data,
  });
};

export const getLocationByIdController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, 'Invalid location id');
  }

  const location = await getLocationById(id);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found location!',
    data: location,
  });
};
