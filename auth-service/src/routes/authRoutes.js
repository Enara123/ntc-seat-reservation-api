import express from "express";
import { register, login } from "../controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes (no need to protect these)
router.post("/register", register);
router.post("/login", login);

// Protected route, accessible only by users with the 'admin' role
router.get("/ntc-admin", verifyToken, checkRole("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

// Another protected route, accessible by users with either 'user' or 'admin' role
router.get("/bus-operator", verifyToken, checkRole("bus-operator"), (req, res) => {
  res.status(200).json({ message: `Welcome, Bus Operator!` });
});

router.get("/bus-operator", verifyToken, checkRole("bus-operator"), (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.email}!` });
});

export default router;
