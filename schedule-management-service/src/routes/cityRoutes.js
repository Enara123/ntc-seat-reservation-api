import express from "express";
import { createCity, getAllCities, getCityById, updateCity, deleteCity } from "../controllers/cityController.js";


const router = express.Router();

router.post('/', createCity);
router.get('/', getAllCities);
router.get('/:cityId', getCityById);
router.put('/:cityId', updateCity);
router.delete('/:cityId', deleteCity);

export default router;
