# Bookify - Event Booking System

A full-stack event booking application that allows users to browse and book events, manage their bookings, and provides an admin panel for event management.

## Features

### Frontend

- Authentication (register and login)
- Home page with event listings in grid layout
- Event cards with booking functionality
- "Booked" label for events already booked by the user
- Event details page with complete event information
- Booking confirmation screen
- User bookings management
- Location-based search functionality

### Backend

- Authentication API
- Event Management API
- Booking API
- Role-based permissions (Admin, User)
- Event image upload functionality
- Pagination for event listings

### super-heros features:

- deployment: frontend in netilfy, backend in fly.io, database in neon.tech
- dark-mode.


## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the frontend directory with:

```
VITE_API_URL= { the localhost running the backend }
```

4. Start the development server:

```
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the backend directory with:

```
PORT= "..."
DATABASE_URL="your_database_connection_string"
JWT_SECRET_KEY="your_jwt_secret"
JWT_EXPIRES_IN="1d"

CLOUDINARY_CLOUD_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_API_SECRET = ""
```

4. Set up the database:

```
npx prisma migrate dev
```

5. Start the server:

```
npm run dev
```

## Admin Access

To create an admin account, register with the "Request Admin Role" option checked. In a production environment, this would be handled through a more secure process.

### Live Project:

https://bookify-io.netlify.app/
