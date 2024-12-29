import authService, { checkUserExists, handleRefreshToken } from "../service/authService.js";

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const roleId = 2;

    const newUser = await authService.addUser(userData, roleId);

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await checkUserExists(username, password);
    res.status(200).json({ message: "Login Successful", accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: "Refresh token missing" });

  try {
    const tokens = await authService.handleRefreshToken(refreshToken);
    res.status(200).json({ message: "Token refreshed successfully", tokens });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
