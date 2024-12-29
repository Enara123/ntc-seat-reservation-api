import { User } from "../models/index.js";
import { UserRole } from "../models/index.js";
import { RoleAccessMapping, RoleAccess } from "../models/roleAccessMapping.js";
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

const getRoleIds = async (userId) => {
  const userRoles = await UserRole.findAll({ where: { userId } });
  if (!userRoles.length) throw new Error("No roles assigned to this user");
  return userRoles.map((userRole) => userRole.roleId);
};

const getPermissions = async (roleIds) => {
  const roleAccessMappings = await RoleAccessMapping.findAll({ where: { roleId: roleIds } });
  if (!roleAccessMappings.length) throw new Error("No access permissions found for the assigned roles");
  const accessIds = roleAccessMappings.map((mapping) => mapping.accessId);
  const roleAccesses = await RoleAccess.findAll({ where: { accessId: accessIds } });
  return roleAccesses.map((access) => ({
    resource: access.resource,
    accessType: access.accessType,
  }));
};

export const checkUserExists = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("User not found");
    if (user.password != password) throw new Error("Invalid credentials");

    const userId = user.userId;
    const roleIds = await getRoleIds(userId);
    const permissions = await getPermissions(roleIds);

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

export const handleRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, secret_key);
    const { username, userId } = decoded;

    const roleIds = await getRoleIds(userId);
    const permissions = await getPermissions(roleIds);

    const accessToken = jwt.sign(
      { username, userId, roleIds, permissions },
      secret_key,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { username, userId },
      secret_key,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error("Invalid refresh token", error.message);
  }
};

export default { addUser, handleRefreshToken };
