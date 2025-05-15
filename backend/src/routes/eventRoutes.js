import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// get all events
router.get("/", getAllEvents);
// get event by ID
router.get("/:id", getEventById);
// create a new event
router.post(
  "/",
  protect,
  authorize("ADMIN"),
  upload.single("image"),
  createEvent
);
// update an event
router.put(
  "/:id",
  protect,
  authorize("ADMIN"),
  upload.single("image"),
  updateEvent
);
// delete an event
router.delete("/:id", protect, authorize("ADMIN"), deleteEvent);

export default router;
