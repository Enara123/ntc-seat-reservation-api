import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import RoleAccess from "./roleAccess.js";
import Role from "./role.js";

const RoleAccessMapping = sequelize.define('RoleAccessMapping', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    accessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'role_access_mapping',
    timestamps: false,
});

Role.belongsToMany(RoleAccess, {
    through: RoleAccessMapping,
    foreignKey: 'roleId',
    otherKey: 'accessId',
});

RoleAccess.belongsToMany(Role, {
    through: RoleAccessMapping,
    foreignKey: 'accessId',
    otherKey: 'roleId',
});

export { Role, RoleAccess, RoleAccessMapping };

