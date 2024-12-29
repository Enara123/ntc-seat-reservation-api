import express from "express";
import dotenv from "dotenv";
import bookingRoute from "./bookings/bookingRoutes.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
// app.use(authMiddleware);
app.use("/booking", bookingRoute);

const PORT = process.env.PORT;

(async () => {
    try {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Error starting server:", error);
    }
})();
