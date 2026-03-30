import createHttpError from 'http-errors';
import * as feedbackService from '../services/feedbackService.js';
import locationsService from '../services/locationsService.js';
import { FEEDBACK_PAGINATION } from '../constants/pagination.js';
import { getPagination } from '../helpers/pagination.js';

const normalizeFeedbackIdRefs = (feedbacksId) =>
  (feedbacksId || []).map((ref) => (ref && ref._id ? ref._id : ref));

export const getLocationFeedbacks = async (req, res) => {
  const { locationId } = req.params;
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    FEEDBACK_PAGINATION,
  );

  const location = await locationsService.getLocationById(locationId);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const feedbacksIdRefs = normalizeFeedbackIdRefs(location.feedbacksId);
  const filter = { _id: { $in: feedbacksIdRefs } };

  const [feedbacks, totalFeedbacks] = await Promise.all([
    feedbackService.findFeedbacks({ filter, skip, limit }),
    feedbackService.countFeedbacks({ filter }),
]);

const totalPages = Math.ceil(totalFeedbacks / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalFeedbacks,
    feedbacks,
  });
};

export const getAllFeedbacks = async (req, res) => {
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    FEEDBACK_PAGINATION,
  );

  const filter = {};

  const [feedbacks, totalFeedbacks] = await Promise.all([
    feedbackService.findFeedbacks({ filter, skip, limit }),
    feedbackService.countFeedbacks({ filter }),
  ]);

  const totalPages = Math.ceil(totalFeedbacks / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalFeedbacks,
    feedbacks,
  });
};

export const createFeedback = async (req, res) => {
  const { locationId } = req.params;

  const location = await locationsService.getLocationById(locationId);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const payload = {
    rate: req.body.rate,
    description: req.body.description,
    userName: req.user.name,
    locationId,
  };

  const feedback = await feedbackService.createFeedback(payload);

  res.status(201).json(feedback);
};