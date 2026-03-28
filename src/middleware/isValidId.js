import mongoose from 'mongoose';

export const isValidId = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        status: 400,
        message: `Invalid ${paramName}`,
      });
    }

    next();
  };
};
