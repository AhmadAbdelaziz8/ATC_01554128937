import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
