import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Location } from '../models/location.js';//Імпортувати, коли інший розробник закінчить модель

export const getCurrentUserController = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Successfully found user!",
    data: req.user,
  });
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
      status: 200,
      message: "Successfully found user!",
      data: {
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserLocationsController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const locations = await Location.find({ userId })
      .skip(Number(skip))
      .limit(Number(limit));

    const totalItems = await Location.countDocuments({ userId });

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
  } catch (error) {
    next(error);
  }
};
