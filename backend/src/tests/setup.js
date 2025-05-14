import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables from .env.test if we're in test mode
dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

// Create a new Prisma client instance for testing
const prisma = new PrismaClient();

// Function to clean up the test database before/after tests
export const clearDatabase = async () => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Cannot clear database outside of test environment");
  }

  // Delete all records from all tables (in reverse order to avoid foreign key constraints)
  await prisma.booking.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
};

// Setup function to run before tests
export const setupTestDB = async () => {
  await clearDatabase();
};

// Teardown function to run after tests
export const teardownTestDB = async () => {
  await clearDatabase();
  await prisma.$disconnect();
};

export { prisma as testPrisma };
