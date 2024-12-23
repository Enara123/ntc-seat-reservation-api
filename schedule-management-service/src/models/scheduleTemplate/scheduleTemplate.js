import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const ScheduleTemplate = sequelize.define("ScheduleTemplate", {
    templateId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    routeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "route",
            key: "routeId",
        },
        onDelete: "CASCADE",
    },
    direction: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    recurrencePattern: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    tableName: "schedule_template",
    timestamps: true,
});

export default ScheduleTemplate;
