// services/locationService.js
import { Location } from '../models/location.js';
import { Feedback } from '../models/feedback.js';
// import mongoose from 'mongoose';

const getLocations = async ({ page = 1, limit = 10, region, type, search, sort }) => {
  const filter = {};

  const sortObj = {};
if (sort === 'rating') sortObj.rating = -1;
if (sort === 'newest') sortObj.createdAt = -1;
if (sort === 'popular') sortObj.rating = -1;

  if (region) filter.region = region;
  if (type) filter.type = type;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const skip = (page - 1) * Number(limit);

  const locations = await Location.collection
    .find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return locations;
};

const getLocationById = async (id) => {
  const location = await Location.findById(id)
    .populate('owner', 'name')
    .populate('region', 'region slug')
    .populate('type', 'type slug')
    .populate('feedbacksId')
    .lean();

  if (!location) return null;

  location.ownerId = location.owner?._id ?? location.owner ?? null;
  location.authorName = location.owner?.name ?? '';
  location.regionName = location.region?.region ?? '';
  location.locationType = location.type?.slug ?? location.type ?? '';
  location.locationTypeName = location.type?.type ?? '';
  location.image = location.images?.[0] ?? '';

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
