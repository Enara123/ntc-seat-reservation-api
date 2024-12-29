import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://silunienara.me',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

(async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
