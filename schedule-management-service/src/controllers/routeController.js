import RouteService from "../services/routeService.js"

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