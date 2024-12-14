import express from "express";
import { createRoute, getAllRoutes, getRouteById, getBusesInRoute, updateRoute, deleteRoute, assignCityToRoute, getRouteCities, updateCitySequence, removeCityFromRoute } from "../controllers/routeController.js";


const router = express.Router();

router.post('/', createRoute);
router.get('/', getAllRoutes);
router.get('/:routeId', getRouteById);
router.get('/:routeId/buses', getBusesInRoute)
router.put('/:routeId', updateRoute);
router.delete('/:routeId', deleteRoute);

router.post('/:routeId/cities', assignCityToRoute);
router.get('/:routeId/cities', getRouteCities);
router.put('/:routeId/cities/:routeCityId', updateCitySequence);
router.delete('/:routeId/cities/:routeCityId', removeCityFromRoute);

export default router;
