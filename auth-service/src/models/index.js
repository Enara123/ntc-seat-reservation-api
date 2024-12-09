import User from "./user.js";
import Role from "./role.js";
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserRole = sequelize.define(
  "user_role",
  {
    userRoleId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
);

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
});

export { User, Role, UserRole };
