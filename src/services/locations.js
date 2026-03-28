import Location from '../models/location.js';

export const createLocation = async (data) => {
  const location = await Location.create(data);
  return location;
};
