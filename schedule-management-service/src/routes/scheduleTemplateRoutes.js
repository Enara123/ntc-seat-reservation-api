import express from "express";
import {
    getAllSchedules,
    getScheduleTemplate,
    createScheduleTemplate,
    updateScheduleTemplate,
    deleteScheduleTemplate
} from "../controllers/scheduleTemplateController.js";

const router = express.Router();

// Route to create a new schedule template along with its details
router.post("/", createScheduleTemplate);

// Route to get all schedules
router.get("/", getAllSchedules);

// Route to get a specific schedule template by ID
router.get("/:templateId", getScheduleTemplate);

// Route to update a schedule template by ID
router.put("/:templateId", updateScheduleTemplate);

// Route to delete a schedule template by ID
router.delete("/:templateId", deleteScheduleTemplate);

export default router;
