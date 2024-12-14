import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const City = sequelize.define('City', {
    cityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    tableName: 'city',
    timestamps: false,
});

export default City;
