import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RoleAccess = sequelize.define('RoleAccess', {
    accessId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    resource: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    accessType: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'role_access',
    timestamps: false,
});

export default RoleAccess;