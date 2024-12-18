import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import ScheduleTemplate from "./scheduleTemplate.js";
import Bus from "../bus.js";

const ScheduleTemplateDetails = sequelize.define("ScheduleTemplateDetails", {
    detailsId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    busId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bus,
            key: "busId",
        },
        onDelete: "CASCADE",
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ScheduleTemplate,
            key: "templateId",
        },
        onDelete: "CASCADE",
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    tableName: "schedule_template_details",
    timestamps: false,
});

export default ScheduleTemplateDetails;
