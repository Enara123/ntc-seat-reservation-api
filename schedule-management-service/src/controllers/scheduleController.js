import scheduleService from "../services/scheduleService.js";

export const createSchedule = async (req, res) => {
    try {
        const { routeId, templateId, startDate, endDate } = req.body;

        const result = await scheduleService.createSchedule(routeId, templateId, startDate, endDate);

        return res.status(201).json({ message: result.message });
    } catch (error) {
        console.error("Error creating schedule entries:", error);
        return res.status(500).json({ message: "Error creating schedule entries." });
    }
};

export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await scheduleService.getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getScheduleById = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const schedule = await scheduleService.getScheduleById(scheduleId);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const { routeId, replacementDetails } = req.body;
        const updatedSchedule = await scheduleService.updateSchedule(req.params.scheduleId, routeId, replacementDetails);
        res.status(200).json({ message: "Bus replaced successfully.", updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        const result = await scheduleService.deleteSchedule(scheduleId);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};