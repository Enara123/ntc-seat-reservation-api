import Bus from "../bus.js";
import Route from "../route.js";
import ScheduleTemplate from "./scheduleTemplate.js";
import ScheduleTemplateDetails from "./scheduleTemplateDetails.js";

ScheduleTemplate.hasMany(ScheduleTemplateDetails, {
    foreignKey: "templateId", onDelete: "CASCADE",
});

ScheduleTemplateDetails.belongsTo(ScheduleTemplate, { foreignKey: "templateId" });

ScheduleTemplate.belongsTo(Route, { foreignKey: "routeId" });

ScheduleTemplateDetails.belongsTo(Bus, { foreignKey: "busId" });

export { ScheduleTemplate, ScheduleTemplateDetails };
