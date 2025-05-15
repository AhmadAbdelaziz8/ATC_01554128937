import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import {
  protect,
  authorize,
  optionalProtect,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// get all events - optional authentication to check if events are booked
router.get("/", optionalProtect, getAllEvents);
// get event by ID - optional authentication to check if event is booked
router.get("/:id", optionalProtect, getEventById);
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
