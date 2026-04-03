import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  avatarURL: Joi.string().uri(),
  oldPassword: Joi.string().min(6).max(128),
  newPassword: Joi.string().min(6).max(128),
})
  .or('name', 'avatarURL', 'newPassword')
  .with('newPassword', 'oldPassword');
