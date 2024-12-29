import Schedule from "../models/schedule/schedule.js";
import { ScheduleTemplate } from "../models/scheduleTemplate/scheduleRelation.js";
import { ScheduleTemplateDetails } from "../models/scheduleTemplate/scheduleRelation.js";
import moment from 'moment';

export const createSchedule = async (routeId, templateId, startDate, endDate) => {
    const transaction = await Schedule.sequelize.transaction();

    try {
        const startMoment = moment(startDate);
        const endDateMoment = moment(endDate);

        if (!startMoment.isValid() || !endDateMoment.isValid()) {
            throw new Error("Invalid start or end date.");
        }

        const template = await ScheduleTemplate.findOne({
            where: { templateId },
            include: { model: ScheduleTemplateDetails },
            transaction
        });

        if (!template) {
            throw new Error("Schedule template not found for the given route and template ID.");
        }

        const scheduleEntries = [];

        const recurrenceDates = generateRecurrenceDates(
            startDate,
            endDate,
            template.recurrencePattern
        );


        template.dataValues.ScheduleTemplateDetails.forEach((detail) => {
            const dataVal = detail.dataValues;
            recurrenceDates.forEach((date) => {
                scheduleEntries.push({
                    routeId,
                    busId: dataVal.busId,
                    templateId: template.dataValues.templateId,
                    startTime: moment.utc(`${date}T${dataVal.startTime}`).toISOString(),
                    endTime: moment.utc(`${date}T${dataVal.endTime}`).toISOString(),
                    status: "active",
                });

                console.log("Details", `${date}T${dataVal.startTime}`);
            });
        });
        await Schedule.bulkCreate(scheduleEntries, { transaction });

        await transaction.commit();

        return { message: "Schedules created successfully." };

    } catch (error) {
        await transaction.rollback();
        console.error("Error creating schedule entries:", error);
        throw new Error("Error creating schedule entries.");
    }

};

const generateRecurrenceDates = (startDate, endDate, recurrencePattern) => {
    const dates = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(moment(endDate))) {
        const day = currentDate.date();
        const dayOfWeek = currentDate.day();

        if (
            recurrencePattern === "daily" ||
            (recurrencePattern === "even" && day % 2 === 0) ||
            (recurrencePattern === "odd" && day % 2 !== 0) ||
            (recurrencePattern === "weekly" && dayOfWeek === 0)
        ) {
            dates.push(currentDate.format("YYYY-MM-DD"));
        }

        currentDate = currentDate.add(1, "day");
    }

    return dates;
};

export const getAllSchedules = async () => {
    try {
        const schedules = await Schedule.findAll();
        return schedules;
    } catch (error) {
        console.error("Error fetching all schedules:", error);
        throw new Error("Error fetching schedules.");
    }
};

export const getScheduleById = async (scheduleId) => {
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        if (!schedule) {
            throw new Error("Schedule not found.");
        }
        return schedule;
    } catch (error) {
        console.error("Error fetching schedule by ID:", error);
        throw new Error("Error fetching schedule.");
    }
};

export const updateSchedule = async (scheduleId, routeId, replacementDetails) => {
    const { newBusId, reasonForChange, startTime, endTime, remarks, status } = replacementDetails;

    try {
        const parsedDetails = JSON.parse(replacementDetails);
        const schedule = await Schedule.findOne({
            where: {
                scheduleId,
                routeId,
                startTime: moment.utc(parsedDetails.startTime).toISOString(),
                endTime: moment.utc(parsedDetails.endTime).toISOString()
            },
        });

        if (!schedule) {
            throw new Error("Schedule not found for the specified route and time range.");
        }

        await schedule.update({
            replacedBusId: newBusId,
            reasonForChange,
            remarks,
            status,
        });

        return schedule;
    } catch (error) {
        console.error("Error replacing bus in schedule:", error);
        throw new Error("Failed to replace the bus in the schedule.");
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        if (!schedule) {
            throw new Error("Schedule not found.");
        }
        await schedule.destroy();
        return { message: "Schedule deleted successfully." };
    } catch (error) {
        console.error("Error deleting schedule:", error);
        throw new Error("Error deleting schedule.");
    }
};

export default { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule };
