import { createSchedule, getScheduleTemplateById, getAllScheduleTemplates, updateScheduleTemplateById, deleteScheduleTemplateById } from "../services/scheduleTemplateService.js";

export const createScheduleTemplate = async (req, res) => {
    try {
        const { scheduleTemplateData, scheduleTemplateDetailsData } = req.body;

        if (!scheduleTemplateData || !scheduleTemplateDetailsData || scheduleTemplateDetailsData.length === 0) {
            return res.status(400).json({ message: "Invalid data. Both schedule template and details are required." });
        }

        const schedule = await createSchedule(scheduleTemplateData, scheduleTemplateDetailsData);

        return res.status(201).json({
            message: "Schedule template created successfully.",
            schedule,
        });
    } catch (error) {
        console.error("Error creating schedule template:", error);
        return res.status(500).json({ message: "An error occurred while creating the schedule template." });
    }
};


export const getScheduleTemplate = async (req, res) => {
    try {
        const { templateId } = req.params;

        if (!templateId) {
            return res.status(400).json({ message: "Template ID is required." });
        }

        const scheduleTemplate = await getScheduleTemplateById(templateId);

        if (!scheduleTemplate) {
            return res.status(404).json({ message: "Schedule template not found." });
        }

        return res.status(200).json({
            message: "Schedule template retrieved successfully.",
            scheduleTemplate,
        });
    } catch (error) {
        console.error("Error retrieving schedule template:", error);
        return res.status(500).json({ message: "An error occurred while retrieving the schedule template." });
    }
};

export const getAllSchedules = async (req, res) => {
    try {
        const scheduleTemplates = await getAllScheduleTemplates();

        return res.status(200).json({
            message: "All schedule templates retrieved successfully.",
            scheduleTemplates,
        });
    } catch (error) {
        console.error("Error retrieving schedule templates:", error);
        return res.status(500).json({ message: "An error occurred while retrieving the schedule templates." });
    }
};


export const updateScheduleTemplate = async (req, res) => {
    try {
        const { templateId } = req.params;
        const { templateData, detailsData } = req.body;

        if (!templateId) {
            return res.status(400).json({ message: "Template ID is required." });
        }

        const updatedTemplate = await updateScheduleTemplateById(templateId, templateData, detailsData);

        return res.status(200).json({
            message: "Schedule template updated successfully.",
            updatedTemplate,
        });
    } catch (error) {
        console.error("Error updating schedule template:", error);
        return res.status(500).json({ message: "An error occurred while updating the schedule template." });
    }
};


export const deleteScheduleTemplate = async (req, res) => {
    try {
        const { templateId } = req.params;

        if (!templateId) {
            return res.status(400).json({ message: "Template ID is required." });
        }

        await deleteScheduleTemplateById(templateId);

        return res.status(200).json({
            message: "Schedule template deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting schedule template:", error);
        return res.status(500).json({ message: "An error occurred while deleting the schedule template." });
    }
};
