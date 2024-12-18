import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Schedule = sequelize.define(
    "Schedule", // Model name
    {
        scheduleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        routeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "route",
                key: "routeId",
            },
        },
        templateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "scheduleTemplate",
                key: "templateId",
            },
        },
        busId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "bus",
                key: "busId",
            },
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("active", "replaced", "inactive"),
            allowNull: false,
        },
        replacedBusId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "bus",
                key: "busId",
            },
        },
        reasonForChange: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Schedule;
