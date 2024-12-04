import User from "./user.js";
import Role from "./role.js";
import sequelize from "../config/database.js";

const UserRole = sequelize.define("UserRole", {}, { timestamps: false });

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export { User, Role, UserRole };
