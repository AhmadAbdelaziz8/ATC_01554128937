import prisma from "../config/prismaClient.js";
import path from "path";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    // extract event data from request body
    const { name, description, category, venue, imageUrl, date, price } =
      req.body;

    // Set up image path - either from uploaded file or provided URL
    let finalImageUrl = imageUrl;
    
    // Check if we have an uploaded file
    if (req.file) {
      // Generate URL for the uploaded image
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const filename = path.basename(req.file.path);
      const relativePath = `/uploads/${filename}`;
      finalImageUrl = `${baseUrl}${relativePath}`;
      

    }

    // validate required fields
    if (
      !name ||
      !description ||
      !category ||
      !venue ||
      !finalImageUrl ||
      !date ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // create event in database
    const eventData = {
      name,
      description,
      category,
      venue,
      imageUrl: finalImageUrl,
      date: new Date(date),
      price: parseFloat(price),
    };

    const newEvent = await prisma.event.create({
      data: eventData,
    });
    // return success response
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    // Check if user is authenticated (req.user will be set by the auth middleware if token provided)
    const userId = req.user?.id;
    
    // Fetch all events from database
    const events = await prisma.event.findMany({ 
      orderBy: { date: "asc" } 
    });
    
    // If user is authenticated, check which events they've booked
    if (userId) {
      // Get all bookings for this user
      const userBookings = await prisma.booking.findMany({
        where: { userId },
        select: { eventId: true }
      });
      
      // Create a set of booked event IDs for faster lookup
      const bookedEventIds = new Set(userBookings.map(booking => booking.eventId));
      
      // Add isBooked flag to each event
      const eventsWithBookingStatus = events.map(event => ({
        ...event,
        isBooked: bookedEventIds.has(event.id)
      }));
      
      return res.status(200).json(eventsWithBookingStatus);
    }
    
    // If user is not authenticated, return events without booking info
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id;
    
    // fetch event by ID from database
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    
    // check if event exists
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // If user is authenticated, check if they've booked this event
    if (userId) {
      const booking = await prisma.booking.findFirst({
        where: {
          userId,
          eventId
        }
      });
      
      return res.status(200).json({
        ...event,
        isBooked: !!booking
      });
    }
    
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Error fetching event by ID" });
  }
};

// update an event done by admin
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = { ...req.body };

    if (!updateData) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Check if we have an uploaded file
    if (req.file) {
      // Generate URL for the uploaded image
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const filename = path.basename(req.file.path);
      const relativePath = `/uploads/${filename}`;
      updateData.imageUrl = `${baseUrl}${relativePath}`;
      
      console.log('File uploaded (update):', {
        originalName: req.file.originalname,
        savedAs: filename,
        fullPath: req.file.path,
        finalUrl: updateData.imageUrl
      });
    }

    // convert date to object and price to number
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    if (updateData.price !== undefined) {
      updateData.price = parseFloat(updateData.price);
    }

    // update event in database
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: updateData,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await prisma.event.delete({
      where: { id: eventId },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting event:", error);
    if (error.code === "P2025") {
      // Record to delete not found
      return res.status(404).json({ message: "Event not found." });
    }
    if (
      error.code === "P2023" ||
      error.message.toLowerCase().includes("malformed uuid")
    ) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }
    res.status(500).json({ message: "Internal server error deleting event." });
  }
};
