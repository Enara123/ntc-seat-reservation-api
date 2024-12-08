import bcrypt from "bcryptjs";
import { User, Role, UserRole } from "../models/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, telephone, password, username, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      telephone,
      password: hashedPassword,
      username,
    });

    if (role) {
      const roleRecords = await Role.findAll({ where: { name: role } });

      for (const roleRecord of roleRecords) {
        await UserRole.create({
          userId: user.id,
          roleId: roleRecord.id,
        });
      }
    } else {
      const defaultRole = await Role.findOne({ where: { name: "user" } });

      await UserRole.create({
        userId: user.id, // The ID of the newly created user
        roleId: defaultRole.id, // The ID of the default 'user' role
      });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
