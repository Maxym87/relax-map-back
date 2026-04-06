// services/locationService.js
import { Location } from '../models/location.js';
import { Feedback } from '../models/feedback.js';
import mongoose from 'mongoose';

const getLocations = async ({ page = 1, limit = 10, region, type, search, sort }) => {
  const filter = {};

  const sortObj = {};
if (sort === 'rating') sortObj.rate = -1;
if (sort === 'newest') sortObj.createdAt = -1;
if (sort === 'popular') sortObj.rate = -1;

  if (region) filter.region = region;
  if (type) filter.locationType = type;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const skip = (page - 1) * Number(limit);

  const locations = await Location.collection
    .find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  console.log('locations log:', locations.length);
  return locations;
};

const getLocationById = async (id) => {
  const location = await Location.findById(id)
    .populate('feedbacksId')
    .lean();

  if (!location) return null;

  if (location.ownerId) {
    const user = await mongoose.connection.db
      .collection('users')
      .findOne({ _id: new mongoose.Types.ObjectId(location.ownerId.toString()) });
    location.authorName = user?.name ?? '';
  }
  if (location.region && typeof location.region === 'string') {
    const region = await mongoose.connection.db
      .collection('regions')
      .findOne({ slug: location.region });
    location.regionName = region?.region ?? location.region;
  }
  if (location.locationType && typeof location.locationType === 'string') {
    const locType = await mongoose.connection.db
      .collection('location_types')
      .findOne({ slug: location.locationType });
    location.locationTypeName = locType?.type ?? location.locationType;
  }

  console.log('ownerId:', location.owner);
  const user = await mongoose.connection.db
    .collection('users')
    .findOne({ _id: new mongoose.Types.ObjectId(location.owner) });
  console.log('user found:', user);
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
