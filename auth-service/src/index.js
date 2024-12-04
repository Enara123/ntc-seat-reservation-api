import express from "express";
import authRoutes from "./routes/authRoutes.js";
import sequelize from "./config/database.js";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
