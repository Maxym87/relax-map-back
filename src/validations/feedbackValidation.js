import { Joi, Segments } from 'celebrate';
import { FEEDBACK_PAGINATION } from '../constants/pagination.js';


const locationIdParam = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().hex().length(24).required().messages({
      'string.base': 'Location ID must be a string',
      'string.length': 'Location ID must be 24 characters',
      'any.required': 'Location ID is required',
    }),
  }),
};

const feedbackListQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(FEEDBACK_PAGINATION.minPage)
    .default(FEEDBACK_PAGINATION.defaultPage),

  perPage: Joi.number()
    .integer()
    .min(FEEDBACK_PAGINATION.minPerPage)
    .max(FEEDBACK_PAGINATION.maxPerPage)
    .default(FEEDBACK_PAGINATION.defaultPerPage),
});

export const getFeedbacksByLocationSchema = {
  ...locationIdParam,
  [Segments.QUERY]: feedbackListQuerySchema,
};

export const getAllFeedbacksSchema = {
  [Segments.QUERY]: feedbackListQuerySchema,
};

export const createFeedbackSchema = {
  ...locationIdParam,

  [Segments.BODY]: Joi.object({
    rate: Joi.number().min(1).max(5).required(),

    description: Joi.string().trim().min(1).max(200).required(),
  }),
};