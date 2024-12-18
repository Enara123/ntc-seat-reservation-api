import RouteCity from "../models/routeCity.js";

export const assignCityToRoute = async (data) => {
    return await RouteCity.create(data);
}

export const getRouteCities = async (routeId) => {
    return await RouteCity.findAll({
        where: { routeId },
        order: [['sequenceOrder', 'ASC']],
    });
}

export const updateSequence = async (routeCityId, sequenceOrder) => {
    const routeCity = await RouteCity.findByPk(routeCityId);
    if (!routeCity) throw new Error('RouteCity not found');
    return await routeCity.update({ sequenceOrder });
}

export const deleteRouteCity = async (routeCityId) => {
    const routeCity = await RouteCity.findByPk(routeCityId);
    if (!routeCity) throw new Error('RouteCity not found');
    await routeCity.destroy();
    return true;
}

export default { assignCityToRoute, getRouteCities, updateSequence, deleteRouteCity };