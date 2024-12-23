import { ScheduleTemplate } from "../models/scheduleTemplate/scheduleRelation.js";
import { ScheduleTemplateDetails } from "../models/scheduleTemplate/scheduleRelation.js";

export const createSchedule = async (scheduleTemplateData, scheduleTemplateDetailsData) => {

    const transaction = await ScheduleTemplate.sequelize.transaction();

    try {
        const scheduleTemplate = await ScheduleTemplate.create(scheduleTemplateData, { transaction });

        const scheduleTemplateDetailsWithTemplateId = scheduleTemplateDetailsData.map((detail) => ({
            ...detail,
            templateId: scheduleTemplate.templateId,
        }));

        await ScheduleTemplateDetails.bulkCreate(scheduleTemplateDetailsWithTemplateId, { transaction });

        await transaction.commit();

        return scheduleTemplate;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getScheduleTemplateById = async (templateId) => {
    try {
        const scheduleTemplate = await ScheduleTemplate.findOne({
            where: { templateId },
            include: { model: ScheduleTemplateDetails }
        });

        return scheduleTemplate;
    } catch (error) {
        console.error("Error fetching schedule template:", error);
        throw error;
    }
};

export const getAllScheduleTemplates = async () => {
    try {
        const scheduleTemplates = await ScheduleTemplate.findAll({ include: ScheduleTemplateDetails });
        return scheduleTemplates;
    } catch (error) {
        console.error("Error fetching all schedule templates:", error);
        throw error;
    }
};

export const updateScheduleTemplateById = async (templateId, templateData, detailsData) => {
    try {
        await ScheduleTemplate.update(templateData, {
            where: { templateId },
        });

        // If details data is provided, update or recreate them
        if (detailsData) {
            await ScheduleTemplateDetails.destroy({ where: { templateId } });

            await ScheduleTemplateDetails.bulkCreate(
                detailsData.map((detail) => ({ ...detail, templateId }))
            );
        }

        const templateWithDetails = await ScheduleTemplate.findOne({
            where: { templateId },
            include: [{ model: ScheduleTemplateDetails }],
        });

        return templateWithDetails;
    } catch (error) {
        console.error("Error updating schedule template:", error);
        throw error;
    }
};


export const deleteScheduleTemplateById = async (templateId) => {
    try {
        await ScheduleTemplateDetails.destroy({ where: { templateId } });
        await ScheduleTemplate.destroy({ where: { templateId } });
    } catch (error) {
        console.error("Error deleting schedule template:", error);
        throw error;
    }
};


export default { createSchedule, getScheduleTemplateById, getAllScheduleTemplates, updateScheduleTemplateById, deleteScheduleTemplateById };
