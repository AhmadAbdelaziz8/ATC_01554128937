import prisma from "../config/prismaClient.js";
import path from "path";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    console.log("Create event request received", {
      body: req.body,
      file: req.file
        ? {
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : "No file uploaded",
    });

    // extract event data from request body
    const { name, description, category, venue, imageUrl, date, price } =
      req.body;

    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = req.file.path;
    }

    if (
      !name ||
      !description ||
      !category ||
      !venue ||
      !finalImageUrl ||
      !date ||
      !price
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: {
          name: !name,
          description: !description,
          category: !category,
          venue: !venue,
          image: !finalImageUrl,
          date: !date,
          price: !price,
        },
      });
    }

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

    console.log("Event created successfully:", newEvent.id);

    // return success response
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { location, category, page = 1, limit = 8 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        message:
          "Invalid pagination parameters. Page and limit must be positive numbers.",
      });
    }

  const skip = (pageNum - 1) * limitNum;

    const whereCondition = {};

    if (location) {
      whereCondition.venue = {
        contains: location,
        mode: "insensitive", // Case-insensitive search
      };
    }

    if (category) {
      whereCondition.category = {
        contains: category,
        mode: "insensitive", // Case-insensitive search
      };
    }

    const totalEvents = await prisma.event.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalEvents / limitNum);

    const events = await prisma.event.findMany({
      where: whereCondition,
      orderBy: { date: "asc" },
      skip,
      take: limitNum,
    });

    if (userId) {
      const userBookings = await prisma.booking.findMany({
        where: { userId },
        select: { eventId: true },
      });

      // Create a set of booked event IDs for faster lookup
      const bookedEventIds = new Set(
        userBookings.map((booking) => booking.eventId)
      );

      // Add isBooked flag to each event
      const eventsWithBookingStatus = events.map((event) => ({
        ...event,
        isBooked: bookedEventIds.has(event.id),
      }));

      return res.status(200).json({
        events: eventsWithBookingStatus,
        pagination: {
          total: totalEvents,
          page: pageNum,
          limit: limitNum,
          totalPages,
        },
      });
    }

    // If user is not authenticated, return events without booking info
    res.status(200).json({
      events,
      pagination: {
        total: totalEvents,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
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

    if (userId) {
      const booking = await prisma.booking.findFirst({
        where: {
          userId,
          eventId,
        },
      });

      return res.status(200).json({
        ...event,
        isBooked: !!booking,
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
      updateData.imageUrl = req.file.path;

    
      console.log("File uploaded (update):", {
        originalName: req.file.originalname,
        savedAs: path.basename(req.file.path),
        fullPath: req.file.path,
        finalUrl: updateData.imageUrl,
      });
    }

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
