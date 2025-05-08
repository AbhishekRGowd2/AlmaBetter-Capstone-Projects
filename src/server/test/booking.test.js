// test/booking.test.js
const request = require("supertest");
const { expect } = require("chai");
const app = require("../index");

describe("Booking API Tests", () => {
  // POST /api/booking with missing fields
  it("should return 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/booking").send({
      movie: "Inception"
      // missing seats and slot
    });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Invalid input. Please provide movie, seats, and slot.");
  });

  // POST /api/booking with valid data
  it("should return 200 and bookingId when data is valid", async () => {
    const res = await request(app).post("/api/booking").send({
      movie: "The Matrix",
      seats: 2,
      slot: "Evening"
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("bookingId");
  });

  // GET /api/booking
  it("should return 200 and an array of bookings", async () => {
    const res = await request(app).get("/api/booking");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  // GET /api/booking/latest
  it("should return 200 and the latest booking", async () => {
    const res = await request(app).get("/api/booking/latest");
    expect([200, 404]).to.include(res.status); // Could be 404 if no bookings yet
    if (res.status === 200) {
      expect(res.body).to.have.property("movie");
    }
  });
});
