import City from "../models/city.js";

export const createCity = async (cityData) => {
    return await City.create(cityData);
};

export const getAllCities = async () => {
    return await City.findAll();
};

export const getCityById = async (cityId) => {
    return await City.findByPk(cityId);
};

export const updateCity = async (cityId, updateData) => {
    const city = await City.findByPk(cityId);
    if (!city) throw new Error('City not found');
    return await city.update(updateData);
};

export const deleteCity = async (cityId) => {
    const city = await City.findByPk(cityId);
    if (!city) throw new Error('City not found');
    await city.destroy();
    return true;
};

export default { createCity, getAllCities, getCityById, updateCity, deleteCity };
