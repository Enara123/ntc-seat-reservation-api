import express from "express";
import authRoutes from "./routes/authRoutes.js";
import sequelize from "./config/database.js";
import Role from "./models/role.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes); // Register auth routes

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync(); // Create tables if they don't exist
    console.log("Database synchronized");

    const roles = ["customer", "ntc-admin", "bus-operator"];
    for (const role of roles) {
      await Role.findOrCreate({
        where: { name: role },
      });
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
