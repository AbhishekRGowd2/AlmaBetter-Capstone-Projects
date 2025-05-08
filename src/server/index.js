const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require("path");
const cors = require("cors");
const { connection } = require("./connector");
const { swaggerUi, swaggerSpec } = require("./swagger");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - movie
 *         - seats
 *         - slot
 *       properties:
 *         movie:
 *           type: string
 *         seats:
 *           type: integer
 *         slot:
 *           type: string
 */


// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking successful
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

app.post("/api/booking", (req, res) => {
    const { movie, seats, slot } = req.body;

    // Validate the input
    if (!movie || !seats || !slot) {
        return res.status(400).json({ message: "Invalid input. Please provide movie, seats, and slot." });
    }

    // Save booking to the database
    const booking = new connection({
        movie,
        slot,
        seats 
    });

    booking.save()
        .then(result => {
            res.status(200).json({ message: "Booking successful", bookingId: result._id });
        })
        .catch(err => {
            console.error("Error saving booking:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

/**
 * @swagger
 * /api/booking/latest:
 *   get:
 *     summary: Get the latest booking
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: The most recent booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: No previous booking found
 *       500:
 *         description: Internal server error
 */


//GET endpoint for retrieving the last booking
app.get("/api/booking/latest", (req, res) => {
    connection.findOne().sort({ _id: -1 }).limit(1)  // Fetch the latest booking
        .then(lastBooking => {
            if (!lastBooking) {
                return res.status(404).json({ message: "No previous booking found" });
            }
            res.status(200).json(lastBooking);
        })
        .catch(err => {
            console.error("Error fetching booking:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

/**
 * @swagger
 * /api/booking:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: List of all bookings
 *       404:
 *         description: No bookings found
 *       500:
 *         description: Internal server error
 */

// GET endpoint for retrieving all bookings
app.get("/api/booking", (req, res) => {
    connection.find() // Fetch all bookings
        .sort({ _id: -1 }) // Sort by _id in descending order (latest first)
        .then(bookings => {
            if (bookings.length === 0) {
                return res.status(404).json({ message: "No previous bookings found" });
            }
            res.status(200).json(bookings); // Send all bookings as a response
        })
        .catch(err => {
            console.error("Error fetching bookings:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
