import { Feedback } from '../models/feedback.js';
import { Location } from '../models/location.js';

const getAllLocations = ({ filter = {}, sort = {}, skip = 0, limit = 0 }) => {
  return Location.find(filter).sort(sort).skip(skip).limit(limit);
};

const getAllLocationsCount = (filter = {}) => {
  return Location.countDocuments(filter);
};

const getLocationById = (locationId) => {
  return Location.findById(locationId);
};

const createLocation = (payload) => {
  return Location.create(payload);
};

const updateLocation = (locationId, payload) => {
  return Location.findByIdAndUpdate(locationId, payload, { new: true });
};

const pushFeedbackId = (locationId, feedbackId) => {
  return Location.findByIdAndUpdate(
    locationId,
    {
      $push: { feedbacksId: feedbackId },
    },
    { new: true },
  );
};

const updateLocationAverageRate = async (locationId) => {
  const location = await Location.findById(locationId).select('feedbacksId');

  if (!location) {
    return;
  }

  const ids = location.feedbacksId || [];

  if (ids.length === 0) {
    await Location.findByIdAndUpdate(locationId, { rate: 0 });
    return;
  }

  const [row] = await Feedback.aggregate([
    { $match: { _id: { $in: ids } } },
    { $group: { _id: null, avgRate: { $avg: '$rate' } } },
  ]);

  if (row == null || row.avgRate == null) {
    await Location.findByIdAndUpdate(locationId, { rate: 0 });
    return;
  }

  const rounded = Math.round(row.avgRate * 2) / 2;

  await Location.findByIdAndUpdate(locationId, { rate: rounded });
};

export default {
  getAllLocations,
  getAllLocationsCount,
  getLocationById,
  createLocation,
  updateLocation,
  pushFeedbackId,
  updateLocationAverageRate,
};
