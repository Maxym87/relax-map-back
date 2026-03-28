import Joi from 'joi';

export const createLocationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(96).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 96 characters long',
    'any.required': 'Name is required',
  }),

  type: Joi.string().trim().max(64).required().messages({
    'string.base': 'Type must be a string',
    'string.empty': 'Type is required',
    'string.max': 'Type must be at most 64 characters long',
    'any.required': 'Type is required',
  }),

  region: Joi.string().trim().max(64).required().messages({
    'string.base': 'Region must be a string',
    'string.empty': 'Region is required',
    'string.max': 'Region must be at most 64 characters long',
    'any.required': 'Region is required',
  }),

  description: Joi.string().trim().min(20).max(6000).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 20 characters long',
    'string.max': 'Description must be at most 6000 characters long',
    'any.required': 'Description is required',
  }),
});

export const updateLocationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(96).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 96 characters long',
    'any.required': 'Name is required',
  }),

  type: Joi.string().trim().max(64).required().messages({
    'string.base': 'Type must be a string',
    'string.empty': 'Type is required',
    'string.max': 'Type must be at most 64 characters long',
    'any.required': 'Type is required',
  }),

  region: Joi.string().trim().max(64).required().messages({
    'string.base': 'Region must be a string',
    'string.empty': 'Region is required',
    'string.max': 'Region must be at most 64 characters long',
    'any.required': 'Region is required',
  }),

  description: Joi.string().trim().min(20).max(6000).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 20 characters long',
    'string.max': 'Description must be at most 6000 characters long',
    'any.required': 'Description is required',
  }),
});