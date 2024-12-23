import express from "express";
import busRoutes from "./routes/busRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import scheduleTemplateRoutes from "./routes/scheduleTemplateRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/bus", busRoutes);
app.use("/cities", cityRoutes);
app.use("/routes", routeRoutes);
app.use("/schedule-template", scheduleTemplateRoutes);
app.use("/schedule", scheduleRoutes);

const PORT = process.env.PORT;

(async () => {
    try {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Error starting server:", error);
    }
})();
