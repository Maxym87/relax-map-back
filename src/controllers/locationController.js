import Location from '../models/location.js';

export const createLocationController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({
        message: 'Image is required',
      });
    }

    const location = await Location.create({
      ...req.body,
      author: userId,
      image: req.file.buffer.toString('base64'),
    });

    res.status(201).json({
      status: 201,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
