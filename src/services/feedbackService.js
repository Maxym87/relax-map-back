import { Feedback } from '../models/feedback.js';
import locationService from './locationService.js';


export const findFeedbacks = ({ filter = {}, skip = 0, limit = 0 }) => {
  return Feedback.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const countFeedbacks = ({ filter = {} }) => {
  return Feedback.countDocuments(filter);
};

export const createFeedback = async (payload) => {
  const { locationId, rate, description, userName } = payload;

  const feedback = await Feedback.create({
    locationId,
    rate,
    description,
    userName,
  });


  await locationService.pushFeedbackId(locationId, feedback._id);


  await locationService.updateLocationAverageRate(locationId);

  return Feedback.findById(feedback._id);
};
