// services/locationService.js
import { Location } from '../models/location.js';
import { Feedback } from '../models/feedback.js';
import mongoose from 'mongoose';

const getLocations = async ({ page = 1, limit = 10, region, type, search }) => {
  const filter = {};



  if (region && mongoose.Types.ObjectId.isValid(region)) {
    filter.region = mongoose.Types.ObjectId(region);
  }

  if (type && mongoose.Types.ObjectId.isValid(type)) {
    filter.type = mongoose.Types.ObjectId(type);
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;


  const locations = await Location.find(filter)
    .skip(skip)
    .limit(limit)
    .populate('feedbacksId')
     .populate('owner')             // владелец локации
  .populate('region')            // регион
  .populate('type');

  return locations;
};

const getLocationById = async (id) => {
  const location = await Location.findById(id).populate('feedbacksId');
  return location;
};

const createLocation = async (data) => {
  const location = await Location.create(data);
  return location;
};

const pushFeedbackId = (locationId, feedbackId) => {
  return Location.findByIdAndUpdate(locationId,
    {$push: { feedbacksId: feedbackId }},
    {new: true}
  );
};

const updateLocationAverageRate = async (locationId) => {
  const location = await Location.findById(locationId).select('feedbacksId');
  if (!location) return;

  const ids = location.feedbacksId || [];
  if (ids.length === 0) return;

  const [row] = await Feedback.aggregate([
    { $match: { _id: { $in: ids } } },
    { $group: { _id: null, avgRate: { $avg: '$rate' } } },
  ]);

  if (!row?.avgRate) return;

  const rounded = Math.round(row.avgRate * 2) / 2;
  await Location.findByIdAndUpdate(locationId, { rating: rounded });
};

export default {
  getLocations,
  getLocationById,
  createLocation,
  pushFeedbackId,
  updateLocationAverageRate,
};
