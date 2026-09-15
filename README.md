# Travel Community Platform — MERN Stack

A submission-ready MERN mini project for a Travel Community Platform with three roles:
Traveler, Agent, and Admin.

## Main features
- JWT authentication
- bcrypt password hashing
- Role-based access
- Destination CRUD
- Trip CRUD
- Trip planning CRUD
- Booking management
- Notifications
- Dashboard statistics
- Category-based feed filtering
- React Router, JSX, props, useState, useEffect
- Axios REST API communication
- MongoDB + Mongoose
- Bootstrap + custom CSS

## Project structure
```text
Travel-Community-Platform/
├── client/
│   └── travel-community-frontend/
├── server/
├── report/
└── README.md
```

## Requirements
- Node.js 18+
- MongoDB local installation OR MongoDB Atlas
- VS Code
- Modern web browser

## Step 1 — Backend
Open a terminal in `server`:

```bash
npm install
```

Copy `.env.example` to `.env` and set your MongoDB connection string.

```bash
npm run seed
npm run dev
```

Backend runs at:
`http://localhost:5000`

## Step 2 — Frontend
Open another terminal:

```bash
cd client/travel-community-frontend
npm install
npm run dev
```

Frontend runs at:
`http://localhost:5173`

## Demo accounts
The seed script creates:
- Admin: admin@travel.com / Admin@123
- Agent: agent@travel.com / Agent@123
- Traveler: traveler@travel.com / Traveler@123

## MongoDB Atlas
If using Atlas:
1. Create a free cluster.
2. Create a database user.
3. Add your development IP address in Network Access.
4. Copy the connection string into `.env`.
5. Run `npm run seed`.

## VS Code
Open the extracted `Travel-Community-Platform` folder in VS Code.
Run the backend and frontend in two terminals.

## API summary
Authentication:
- POST `/api/auth/register`
- POST `/api/auth/login`

Destinations:
- GET `/api/destination`
- GET `/api/destination/:id`
- POST `/api/destination`
- PUT `/api/destination/:id`
- DELETE `/api/destination/:id`

Trips:
- GET `/api/trip`
- GET `/api/trip/:id`
- POST `/api/trip`
- PUT `/api/trip/:id`
- DELETE `/api/trip/:id`

Trip Planning:
- GET `/api/tripplanning`
- GET `/api/tripplanning/:id`
- POST `/api/tripplanning`
- PUT `/api/tripplanning/:id`
- DELETE `/api/tripplanning/:id`

Bookings:
- GET `/api/booking`
- POST `/api/booking`
- PUT `/api/booking/:id`
- DELETE `/api/booking/:id`

Notifications:
- GET `/api/notification`
- PUT `/api/notification/:id/read`

Dashboard:
- GET `/api/dashboard`

## Important
Never commit `.env` or real passwords to GitHub.
