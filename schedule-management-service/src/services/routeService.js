import Bus from "../models/bus.js";
import Route from "../models/route.js";

export const createRoute = async (routeData) => {
    return await Route.create(routeData);
};

export const getAllRoutes = async () => {
    return await Route.findAll();
};

export const getRouteById = async (routeId) => {
    return await Route.findByPk(routeId);
};

export const getBusesInRoute = async (routeId) => {
    return await Bus.findAll({ where: { routeId } });
}

export const updateRoute = async (routeId, updateData) => {
    const route = await Route.findByPk(routeId);
    if (!route) throw new Error('Route not found');
    return await route.update(updateData);
};

export const deleteRoute = async (routeId) => {
    const route = await Route.findByPk(routeId);
    if (!route) throw new Error('Route not found');
    await route.destroy();
    return true;
};

export default { createRoute, getAllRoutes, getRouteById, getBusesInRoute, updateRoute, deleteRoute };