🎬 Movie Ticket Booking App
A full-stack web application for booking movie tickets with real-time seat selection and persistent booking history.

🚀 Features
🎥 Select from a list of popular movies

🕒 Choose a convenient time slot

💺 Select seat types and quantities

📦 Persistent state using localStorage

📤 Submit booking details to the backend

📄 View the most recent booking instantly

🧩 Tech Stack
Frontend: React, Bootstrap, CSS

Backend: Node.js, Express, MongoDB (Mongoose)

API Docs: Swagger UI

Data Persistence: localStorage (client-side), MongoDB (server-side)

📡 API Endpoints
POST /api/booking – Create a new booking

GET /api/booking – Fetch all bookings

GET /api/booking/latest – Get the latest booking

GET /api-docs – View Swagger documentation

📁 Project Structure
src/client/ – React app for UI and user interactions

src/server/ – Express server with MongoDB integration

src/server/schema.js – Mongoose schema for booking

src/server/swagger.js – Swagger configuration for API documentation

💡 Start booking your show and manage it all in one place!
