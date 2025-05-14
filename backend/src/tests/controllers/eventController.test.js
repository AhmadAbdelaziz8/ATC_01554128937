import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../../controllers/eventController.js";
import prismaMock from "../__mocks__/prismaMock.js";
import { testEvents, testUsers } from "../utils/testHelpers.js";

// Mock the prisma client
jest.mock("../../config/prismaClient.js", () => {
  return {
    __esModule: true,
    default: prismaMock,
  };
});

describe("Event Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
      params: {},
      user: { ...testUsers.admin },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("createEvent function", () => {
    test("should return 400 if required fields are missing", async () => {
      req.body = {
        name: "Test Event",
        // Missing required fields
      };

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining("All fields are required"),
        })
      );
    });

    test("should create an event with valid data", async () => {
      const eventData = {
        name: "New Test Event",
        description: "Event description",
        category: "Test Category",
        venue: "Test Venue",
        imageUrl: "https://example.com/image.jpg",
        date: "2025-01-01T12:00:00Z",
        price: "25.99",
      };

      req.body = eventData;

      const createdEvent = {
        id: "new-event-id",
        ...eventData,
        date: new Date(eventData.date),
        price: parseFloat(eventData.price),
      };

      prismaMock.event.create.mockResolvedValue(createdEvent);

      await createEvent(req, res);

      expect(prismaMock.event.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: eventData.name,
          description: eventData.description,
          category: eventData.category,
          venue: eventData.venue,
          imageUrl: eventData.imageUrl,
          price: parseFloat(eventData.price),
        }),
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdEvent);
    });
  });

  describe("getAllEvents function", () => {
    test("should return all events", async () => {
      const mockEvents = [testEvents.event1, testEvents.event2];

      prismaMock.event.findMany.mockResolvedValue(mockEvents);

      await getAllEvents(req, res);

      expect(prismaMock.event.findMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    test("should handle errors", async () => {
      prismaMock.event.findMany.mockRejectedValue(new Error("Database error"));

      await getAllEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("getEventById function", () => {
    test("should return a specific event by ID", async () => {
      req.params.id = testEvents.event1.id;

      prismaMock.event.findUnique.mockResolvedValue(testEvents.event1);

      await getEventById(req, res);

      expect(prismaMock.event.findUnique).toHaveBeenCalledWith({
        where: { id: testEvents.event1.id },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(testEvents.event1);
    });

    test("should return 404 if event is not found", async () => {
      req.params.id = "non-existent-id";

      prismaMock.event.findUnique.mockResolvedValue(null);

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Event not found" });
    });
  });

  describe("updateEvent function", () => {
    test("should update an event with valid data", async () => {
      req.params.id = testEvents.event1.id;
      req.body = {
        name: "Updated Event Name",
        price: "50.99",
      };

      const updatedEvent = {
        ...testEvents.event1,
        name: "Updated Event Name",
        price: 50.99,
      };

      prismaMock.event.update.mockResolvedValue(updatedEvent);

      await updateEvent(req, res);

      expect(prismaMock.event.update).toHaveBeenCalledWith({
        where: { id: testEvents.event1.id },
        data: expect.objectContaining({
          name: "Updated Event Name",
          price: 50.99,
        }),
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedEvent);
    });

    test("should return 400 if no update data is provided", async () => {
      req.params.id = testEvents.event1.id;
      req.body = {};

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "No update data provided",
      });
    });
  });

  describe("deleteEvent function", () => {
    test("should delete an event by ID", async () => {
      req.params.id = testEvents.event1.id;

      await deleteEvent(req, res);

      expect(prismaMock.event.delete).toHaveBeenCalledWith({
        where: { id: testEvents.event1.id },
      });

      expect(res.status).toHaveBeenCalledWith(204);
    });

    test("should return 404 if event to delete is not found", async () => {
      req.params.id = "non-existent-id";

      prismaMock.event.delete.mockRejectedValue({ code: "P2025" });

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Event not found." });
    });
  });
});
