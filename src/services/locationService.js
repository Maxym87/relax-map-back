import { Feedback } from '../models/feedback.js';
import { Location } from '../models/location.js';




const getLocations = async ({ page = 1, limit = 10, region, type, search }) =>{
    const filter = {};
  if (region) filter.region = region;
  if (type) filter.type = type;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const skip = (page - 1) * limit;
  const locations = await Location.find(filter).skip(skip).limit(limit);

  return locations;
};

const getLocationById = async(id)=>{
  const location = await Location.findById(id).populate('feedbacksId');
  return location;
};




const pushFeedbackId = (locationId, feedbackId) => {
  return Location.findByIdAndUpdate(locationId, {
    $push: { feedbacksId: feedbackId },
  });
};

const updateLocationAverageRate = async (locationId) => {
  const location = await Location.findById(locationId).select('feedbacksId');
  if (!location) {
    return;
  }
  const ids = location.feedbacksId || [];
  if (ids.length === 0) {
    return;
  }
  const [row] = await Feedback.aggregate([
    { $match: { _id: { $in: ids } } },
    { $group: { _id: null, avgRate: { $avg: '$rate' } } },
  ]);
  if (row == null || row.avgRate == null) {
    return;
  }
  const rounded = Math.round(row.avgRate * 2) / 2;
  await Location.findByIdAndUpdate(locationId, { rate: rounded });
};

export default {

  pushFeedbackId,
  updateLocationAverageRate,
  getLocations,
  getLocationById,
};
