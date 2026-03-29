import { Joi, Segments } from 'celebrate';
import { FEEDBACK_PAGINATION } from '../constants/pagination.js';
import { locationIdValidator } from './locationsValidation.js';

const feedbackListQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  perPage: Joi.number().min(1).max(50).default(10),
});

export const getFeedbacksByLocationSchema = {
  ...locationIdValidator,
  [Segments.QUERY]: feedbackListQuerySchema,
};

export const getAllFeedbacksSchema = {
  [Segments.QUERY]: feedbackListQuerySchema,
};

export const createFeedbackSchema = {
  ...locationIdValidator,
  [Segments.BODY]: Joi.object({
    rate: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages({
        'number.base': 'Rate must be a number',
        'number.min': 'Rate must be at least {#limit}',
        'number.max': 'Rate must be at most {#limit}',
        'any.required': 'Rate is required',
      }),
    description: Joi.string()
      .trim()
      .min(1)
      .max(200)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must be at most {#limit} characters long',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
      }),
  }),
};