import User from "./user.js";
import Role from "./role.js";
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserRole = sequelize.define(
  "UserRole",
  {
    userRoleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "roleId",
      },
    },
  },
  {
    tableName: "user_roles",
    timestamps: false,
  }
);

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  otherKey: "roleId",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
});

export { User, Role, UserRole };
