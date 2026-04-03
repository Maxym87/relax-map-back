// controllers/userController.js
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Location } from '../models/location.js';


export const getCurrentUserController = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Successfully found user!",
    data: req.user,
  });
};


export const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: "Successfully found user!",
    data: {
      name: user.name,
      avatar: user.avatarURL,
    },
  });
};


export const getUserLocationsController = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;


  const locations = await Location.find({ owner: userId })
    .skip(Number(skip))
    .limit(Number(limit));

  const totalItems = await Location.countDocuments({ owner: userId });

  res.status(200).json({
    status: 200,
    message: "Successfully found locations!",
    data: {
      data: locations,
      page: Number(page),
      limit: Number(limit),
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  });
};


export const updateUserProfileController = async (req, res) => {
  const userId = req.user._id;
  const { name, avatarURL, oldPassword, newPassword } = req.body;

  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (avatarURL !== undefined) updateData.avatarURL = avatarURL;

  if (newPassword) {
    const isMatch = await bcrypt.compare(oldPassword, req.user.password);

    if (!isMatch) {
      throw createHttpError(400, 'Old password is incorrect');
    }

    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    status: 200,
    message: 'Successfully updated profile',
    data: updatedUser,
  });
};
