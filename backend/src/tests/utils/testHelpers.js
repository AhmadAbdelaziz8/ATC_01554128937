import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate a test JWT token for authentication tests
export const generateTestToken = (userId = 'test-user-id', role = 'USER') => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET_KEY || 'test-secret-key',
    { expiresIn: '1h' }
  );
};

// Generate a hashed password for test users
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Mock request and response objects for controller tests
export const mockRequestResponse = () => {
  const req = {
    body: {},
    params: {},
    headers: {},
    user: null,
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };

  return { req, res };
};

// Test user data for authentication tests
export const testUsers = {
  admin: {
    id: 'admin-user-id',
    email: 'admin@test.com',
    fullName: 'Admin User',
    passwordHash: 'hashed-password',
    role: 'ADMIN',
  },
  regularUser: {
    id: 'regular-user-id',
    email: 'user@test.com',
    fullName: 'Regular User',
    passwordHash: 'hashed-password', 
    role: 'USER',
  }
};

// Test event data for event controller tests
export const testEvents = {
  event1: {
    id: 'event-1-id',
    name: 'Test Event 1',
    description: 'Description for test event 1',
    category: 'Test Category',
    date: new Date('2025-01-01'),
    venue: 'Test Venue',
    price: 10.99,
    imageUrl: 'http://example.com/image1.jpg',
  },
  event2: {
    id: 'event-2-id',
    name: 'Test Event 2',
    description: 'Description for test event 2',
    category: 'Another Category',
    date: new Date('2025-02-01'),
    venue: 'Another Venue',
    price: 20.99,
    imageUrl: 'http://example.com/image2.jpg',
  }
}; 