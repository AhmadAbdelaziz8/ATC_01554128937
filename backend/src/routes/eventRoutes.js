import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// create a new event
router.post("/", protect, authorize("ADMIN"), createEvent);

// get all events
router.get("/", getAllEvents);

// get event by ID
router.get("/:id", getEventById);
// update an event
router.put("/:id", protect, authorize("ADMIN"), updateEvent);

// delete an event
router.delete("/:id", protect, authorize("ADMIN"), deleteEvent);

export default router;
