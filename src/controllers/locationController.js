// controllers/locationController.js

import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { Location } from '../models/location.js';
import locationService from '../services/locationService.js';

const { getLocations, getLocationById } = locationService;

export const getLocationsController = async (req, res) => {
const { page = 1, limit = 10, region, type, search } = req.query;


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

export const createLocationController = async (req, res) => {
  const userId = req.user._id;

  if (!req.file) {
    throw createHttpError(400, 'Image is required');
  }

  const location = await Location.create({
    ...req.body,
    owner: userId,
    images: [req.file.buffer.toString('base64')],
  });

  res.status(201).json({
    status: 201,
    data: location,
  });
};

export const updateLocationController = async (req, res) => {
  const { locationId } = req.params;
  const userId = req.user._id;

  const location = await Location.findById(locationId);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  if (location.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'Forbidden');
  }

  const updatedData = {
    ...req.body,
  };

  if (req.file) {
    updatedData.images = [req.file.buffer.toString('base64')];
  }

  const updatedLocation = await Location.findByIdAndUpdate(
    locationId,
    updatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 200,
    data: updatedLocation,
  });
};
