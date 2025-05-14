import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { register, login } from "../../controllers/authController.js";
import prismaMock from "../__mocks__/prismaMock.js";
import { testUsers, hashPassword } from "../utils/testHelpers.js";

// Mock modules
jest.mock("../../config/prismaClient.js", () => {
  return {
    __esModule: true,
    default: prismaMock,
  };
});

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(() => "test-salt"),
  hash: jest.fn(() => "hashed-password"),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "test-token"),
}));

describe("Auth Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register function", () => {
    test("should return 400 if email or password is missing", async () => {
      // Test missing email
      req.body = { password: "password123" };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);

      // Test missing password
      jest.clearAllMocks();
      req.body = { email: "test@example.com" };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should return 400 if password is too short", async () => {
      req.body = { email: "test@example.com", password: "12345" }; // Less than 6 chars
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining("6 characters"),
        })
      );
    });

    test("should return 409 if email is already in use", async () => {
      req.body = {
        email: "existing@example.com",
        password: "password123",
      };

      prismaMock.user.findUnique.mockResolvedValue(testUsers.regularUser);

      await register(req, res);

      expect(prismaMock.user.findUnique).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already in use.",
      });
    });

    test("should create a regular user (USER role) by default", async () => {
      req.body = {
        fullName: "Test User",
        email: "newuser@example.com",
        password: "password123",
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue({
        id: "new-user-id",
        fullName: "Test User",
        email: "newuser@example.com",
        role: "USER",
        createdAt: new Date(),
      });

      await register(req, res);

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          fullName: "Test User",
          email: "newuser@example.com",
          passwordHash: "hashed-password",
          role: "USER",
        }),
        select: expect.any(Object),
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User registered successfully",
          user: expect.objectContaining({
            role: "USER",
          }),
        })
      );
    });

    test("should create an admin user when isRequestingAdminRole is true", async () => {
      req.body = {
        fullName: "Admin User",
        email: "admin@example.com",
        password: "password123",
        isRequestingAdminRole: true,
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue({
        id: "new-admin-id",
        fullName: "Admin User",
        email: "admin@example.com",
        role: "ADMIN",
        createdAt: new Date(),
      });

      await register(req, res);

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          fullName: "Admin User",
          email: "admin@example.com",
          passwordHash: "hashed-password",
          role: "ADMIN",
        }),
        select: expect.any(Object),
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User registered successfully",
          user: expect.objectContaining({
            role: "ADMIN",
          }),
          securityNote: expect.stringContaining("insecure for production"),
        })
      );
    });
  });

  describe("login function", () => {
    test("should return 400 if email or password is missing", async () => {
      // Test missing email
      req.body = { password: "password123" };
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);

      // Test missing password
      jest.clearAllMocks();
      req.body = { email: "test@example.com" };
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should return 401 if user is not found", async () => {
      req.body = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      prismaMock.user.findUnique.mockResolvedValue(null);

      await login(req, res);

      expect(prismaMock.user.findUnique).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials.",
      });
    });

    test("should return 401 if password is incorrect", async () => {
      req.body = {
        email: "user@example.com",
        password: "wrongpassword",
      };

      prismaMock.user.findUnique.mockResolvedValue(testUsers.regularUser);
      bcrypt.compare.mockResolvedValue(false); // Password comparison fails

      await login(req, res);

      expect(bcrypt.compare).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials.",
      });
    });

    test("should return token and user data if login is successful", async () => {
      req.body = {
        email: "user@example.com",
        password: "correctpassword",
      };

      prismaMock.user.findUnique.mockResolvedValue(testUsers.regularUser);
      bcrypt.compare.mockResolvedValue(true); // Password comparison succeeds

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: testUsers.regularUser.id, role: testUsers.regularUser.role },
        expect.any(String),
        expect.any(Object)
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Login successful",
          token: "test-token",
          user: expect.objectContaining({
            id: testUsers.regularUser.id,
            email: testUsers.regularUser.email,
            role: testUsers.regularUser.role,
          }),
        })
      );
    });
  });
});
