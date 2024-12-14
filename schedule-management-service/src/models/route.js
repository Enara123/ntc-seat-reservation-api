import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Route = sequelize.define('Route', {
    routeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    routeName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    tableName: 'route',
    timestamps: false,
});

export default Route;
