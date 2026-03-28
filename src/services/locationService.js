import { Location } from '../models/location.js';

export const getLocations = async ({
  page = 1,
  limit = 10,
  region,
  type,
  search,
}) => {
  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const filter = {};

  if (region) filter.region = region;
  if (type) filter.type = type;

  if (search) {
    filter.name = {
      $regex: search,
      $options: 'i',
    };
  }

  const items = await Location.find(filter)
    .populate('region')
    .populate('type')
    .skip(skip)
    .limit(parsedLimit)
    .sort({ createdAt: -1 });

  const totalItems = await Location.countDocuments(filter);

  const totalPages = Math.ceil(totalItems / parsedLimit);

  return {
    items,
    page: parsedPage,
    totalPages,
  };
};

export const getLocationById = async (id) => {
  return await Location.findById(id).populate('region').populate('type');
};
