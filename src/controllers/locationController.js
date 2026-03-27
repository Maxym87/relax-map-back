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

export const updateLocationController = async (req, res) => {
  try {
    const { locationId } = req.params;
    const userId = req.user._id;

    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({
        status: 404,
        message: 'Location not found',
      });
    }

    if (location.author.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 403,
        message: 'Forbidden: only author can edit this location',
      });
    }

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = req.file.buffer.toString('base64');
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: 200,
      data: updatedLocation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};