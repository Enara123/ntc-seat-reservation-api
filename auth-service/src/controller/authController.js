import authService, { checkUserExists } from "../service/authService.js";

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const roleId = 5;

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
