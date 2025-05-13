import express from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllBookings);
router.post("/:id", createBooking);
router.delete("/:id", deleteBooking);

export default router;
