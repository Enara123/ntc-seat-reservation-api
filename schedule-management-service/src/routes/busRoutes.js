import express from "express";
import { createBus, getAllBuses, getBusById, updateBus, deleteBus } from "../controllers/busController.js";

const router = express.Router();

router.post('/', createBus);
router.get('/', getAllBuses);
router.get('/:busId', getBusById);
router.put('/:busId', updateBus);
router.delete('/:busId', deleteBus);

export default router;
