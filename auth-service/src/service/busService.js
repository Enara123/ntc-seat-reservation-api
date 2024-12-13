import Bus from "../models/bus.js";

export const createBus = async (busData) => {
    return await Bus.create(busData);
};

export const getAllBuses = async () => {
    return await Bus.findAll();
};

export const getBusById = async (busId) => {
    return await Bus.findByPk(busId);
};


export const updateBus = async (busId, updateData) => {
    const bus = await Bus.findByPk(busId);
    if (!bus) throw new Error('Bus not found');
    return await bus.update(updateData);
};

export const deleteBus = async (busId) => {
    const bus = await Bus.findByPk(busId);
    if (!bus) throw new Error('Bus not found');
    await bus.destroy();
    return true;
};

export default { createBus, getAllBuses, getBusById, updateBus, deleteBus };