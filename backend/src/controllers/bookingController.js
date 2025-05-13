import prisma from "../config/prismaClient.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  if (!eventId || !userId) {
    return res
      .status(400)
      .json({ message: "Event ID and user ID are required" });
  }

  try {
    // check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // check if event is in the past
    if (event.date < new Date()) {
      return res.status(400).json({ message: "Event is in the past" });
    }

    // check if user has already booked this event
    const existingBooking = await prisma.booking.findFirst({
      where: { eventId, userId },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    // create a new booking
    const newBooking = await prisma.booking.create({
      data: {
        userId: userId,
        eventId: eventId,
        numberOfTickets: 1, // As per requirement: books 1 ticket per click
      },
      include: {
        // Optionally include event details in the response
        event: {
          select: { name: true, date: true, venue: true },
        },
      },
    });

    res
      .status(201)
      .json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
};

// Get all bookings for me
export const getAllBookings = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        event: {
          select: { name: true, date: true, venue: true },
        },
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// delete booking
export const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  // Validate input
  if (!bookingId || !userId) {
    return res
      .status(400)
      .json({ message: "Booking ID and User ID are required" });
  }

  try {
    // Find the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
};
