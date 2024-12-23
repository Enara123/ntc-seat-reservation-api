import express from "express";
import { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule } from "../controllers/scheduleController.js";

const router = express.Router();

router.post("/", createSchedule);
router.get("/", getAllSchedules);
router.get("/:scheduleId", getScheduleById);
router.put("/:scheduleId", updateSchedule);
router.delete("/:scheduleId", deleteSchedule);

export default router;
