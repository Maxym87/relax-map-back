import Joi from 'joi';

export const createLocationSchema = Joi.object({
  name: Joi.string().min(3).max(96).required(),
  type: Joi.string().max(64).required(),
  region: Joi.string().max(64).required(),
  description: Joi.string().min(20).max(6000).required(),
});