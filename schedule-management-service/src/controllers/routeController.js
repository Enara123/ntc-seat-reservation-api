import RouteService from "../services/routeService.js"
import RouteCityService from "../services/routeCityService.js"

export const createRoute = async (req, res) => {
    try {
        const route = await RouteService.createRoute(req.body);
        res.status(201).json(route);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllRoutes = async (req, res) => {
    try {
        const routes = await RouteService.getAllRoutes();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRouteById = async (req, res) => {
    try {
        const route = await RouteService.getRouteById(req.params.routeId);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBusesInRoute = async (req, res) => {
    try {
        const { routeId } = req.params;
        const buses = await RouteService.getBusesInRoute(routeId);
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRoute = async (req, res) => {
    try {
        const updatedRoute = await RouteService.updateRoute(req.params.routeId, req.body);
        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRoute = async (req, res) => {
    try {
        await RouteService.deleteRoute(req.params.routeId);
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const assignCityToRoute = async (req, res) => {
    try {
        const data = { ...req.body, routeId: req.params.routeId };
        const routeCity = await RouteCityService.assignCityToRoute(data);
        res.status(201).json(routeCity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getRouteCities = async (req, res) => {
    try {
        const routeCities = await RouteCityService.getRouteCities(req.params.routeId);
        res.status(200).json(routeCities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCitySequence = async (req, res) => {
    try {
        const updatedRouteCity = await RouteCityService.updateSequence(
            req.params.routeCityId,
            req.body.sequenceOrder
        );
        res.status(200).json(updatedRouteCity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const removeCityFromRoute = async (req, res) => {
    try {
        await RouteCityService.deleteRouteCity(req.params.routeCityId);
        res.status(200).json({ message: 'City removed from route successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}