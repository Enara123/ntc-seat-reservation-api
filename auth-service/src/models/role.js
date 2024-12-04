import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define("Role", {
  roleId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.TINYINT, defaultValue: 1 },
});

export default Role;
