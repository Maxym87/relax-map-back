// controllers/users.js
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const updateUserProfileController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const {
      name,
      avatarURL,
      oldPassword,
      newPassword,
    } = req.body;

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (avatarURL !== undefined) {
      updateData.avatarURL = avatarURL;
    }

    if (newPassword) {
      const isMatch = await bcrypt.compare(
        oldPassword,
        req.user.password,
      );

      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          message: 'Old password is incorrect',
        });
      }

      updateData.password = await bcrypt.hash(
        newPassword,
        10,
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).select('-password');

    return res.status(200).json({
      status: 200,
      message: 'Successfully updated profile',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
