import { Feedback } from '../models/feedback.js';
import { FEEDBACK_SORT_BY_CREATED_AT } from '../constants/feedback.js';
import locationService from './locationService.js';

export const findFeedbacks = ({ filter, skip, limit }) => {
  return Feedback.find(filter)
    .sort(FEEDBACK_SORT_BY_CREATED_AT)
    .skip(skip)
    .limit(limit);
};

export const countFeedbacks = ({ filter }) => {
  return Feedback.countDocuments(filter);
};


export const createFeedback = async (payload) => {
  const { locationId, rate, description, userName } = payload;
  const feedback = await Feedback.create({
    rate,
    description,
    userName,
  });
  await locationService.pushFeedbackId(locationId, feedback._id);
  await locationService.updateLocationAverageRate(locationId);
  return Feedback.findById(feedback._id);
};
