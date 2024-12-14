import express from "express";
import { createRoute, getAllRoutes, getRouteById, updateRoute, deleteRoute } from "../controllers/routeController.js";


const router = express.Router();

router.post('/', createRoute);
router.get('/', getAllRoutes);
router.get('/:routeId', getRouteById);
router.put('/:routeId', updateRoute);
router.delete('/:routeId', deleteRoute);

export default router;
