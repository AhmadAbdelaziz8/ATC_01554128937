# Bookify Backend

The backend API for the Bookify event booking application, built with Express.js and Prisma.

## Features

- User authentication (register, login)
- Role-based authorization (Admin, User)
- Event management (CRUD operations)
- Booking management
- Image upload functionality
- Location-based event filtering
- Pagination for event listings

## Setup Instructions

1. Install dependencies:

```
npm install
```

2. Create a `.env` file in the backend directory with:

```
PORT=3000
DATABASE_URL="your_database_connection_string"
JWT_SECRET_KEY="your_jwt_secret"
JWT_EXPIRES_IN="1d"
```

3. Set up the database:

```
npx prisma generate
npx prisma migrate dev
```

4. Start the development server:

```
npm run dev
```

5. Start for production:

```
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Events

- `GET /api/events` - Get all events (with pagination and filters)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event (admin only)
- `PUT /api/events/:id` - Update an event (admin only)
- `DELETE /api/events/:id` - Delete an event (admin only)

### Bookings

- `GET /api/bookings` - Get all bookings for authenticated user
- `POST /api/bookings/:id` - Book an event
- `DELETE /api/bookings/:id` - Cancel a booking

## Project Structure

- `src/controllers` - Request handlers
- `src/routes` - API routes
- `src/middleware` - Express middleware
- `src/config` - Configuration files
- `prisma` - Database schema and migrations
