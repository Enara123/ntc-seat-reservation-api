import { User } from "../models/index.js";
import { UserRole } from "../models/index.js";
import { RoleAccess } from "../models/roleAccess.js"
import { RoleAccessMapping } from "../models/roleAccessMapping.js";
import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET;

export const addUser = async (user, roleId) => {
  try {
    const { firstName, lastName, email, telephone, password, username } = user;

    if (!firstName || !lastName || !email || !telephone || !password || !username) {
      throw new Error("All fields are required");
    }

    const newUser = await User.create({
      lastName,
      firstName,
      email,
      telephone,
      password,
      username,
    });

    const userId = newUser.dataValues.userId;
    console.log(userId);
    await UserRole.create({ userId, roleId });
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkUserExists = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password != password) {
      throw new Error("Invalid credentials");
    }

    const userId = user.userId;

    const userRole = await UserRole.findAll({ where: { userId } });

    if (!userRole.length) {
      throw new Error("No roles assigned to this user");
    }

    // Extract roleIds
    const roleIds = userRole.map((userRole) => userRole.roleId);

    // Find all access permissions for these roles
    const roleAccessMappings = await RoleAccessMapping.findAll({
      where: { roleId: roleIds },
    });

    if (!roleAccessMappings.length) {
      throw new Error("No access permissions found for the assigned roles");
    }

    // Extract accessIds from the mappings
    const accessIds = roleAccessMappings.map((mapping) => mapping.accessId);

    // Retrieve the access details from the RoleAccess table
    const roleAccesses = await RoleAccess.findAll({
      where: { accessId: accessIds },
    });

    // Build the permissions array
    const permissions = roleAccesses.map((access) => ({
      resource: access.resource,
      accessType: access.accessType,
    }));

    // Create access and refresh tokens
    const accessToken = jwt.sign(
      { username, userId, roleIds, permissions },
      secret_key,
      { expiresIn: "5min" }
    );

    const refreshToken = jwt.sign(
      { username, userId },
      secret_key,
      { expiresIn: "1h" }
    );

    return { accessToken, refreshToken };

  } catch (error) {

    console.log(error);
    throw new Error(error.message);

  }
};

export default { addUser };
