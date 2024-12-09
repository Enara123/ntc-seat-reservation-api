import { User } from "../models/index.js";
import { UserRole } from "../models/index.js";
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
    const userId = user.userId;
    const roleId = await UserRole.findOne({ where: { userId } });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password != password) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign({ username, userId, roleId }, secret_key, { expiresIn: "5min" });

    const refreshToken = jwt.sign({ username, userId }, secret_key, { expiresIn: "1h" });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export default { addUser };
