import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Bus = sequelize.define('Bus', {
    busId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    operatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permitId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    vehicleRegNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: '1',
    },
    type: {
        type: DataTypes.STRING('luxury', 'normal'),
        allowNull: false,
    },
    seatCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'buses',
    timestamps: false,
});

export default Bus;
