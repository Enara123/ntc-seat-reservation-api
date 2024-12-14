import express from "express";
import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/bus", busRoutes);
app.use("/cities", cityRoutes);
app.use("/routes", routeRoutes);

const PORT = process.env.PORT;

(async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
