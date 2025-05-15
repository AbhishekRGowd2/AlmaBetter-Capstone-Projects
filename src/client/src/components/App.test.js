// App.test.js
import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import Swal from "sweetalert2";

// Mock Swal.fire
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve()),
}));

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

beforeEach(() => {
  fetch.mockClear();
  Swal.fire.mockClear();
  localStorage.clear();
});

test("renders initial UI", () => {
  render(<App />);
  expect(screen.getByText(/Book that show/i)).toBeInTheDocument();
  expect(screen.getByText(/Select a Movie/i)).toBeInTheDocument();
  expect(screen.getByText(/Select a Time Slot/i)).toBeInTheDocument();
  expect(screen.getByText(/Select the seats/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit Booking/i)).toBeInTheDocument();
});

test("shows validation if no movie or slot selected", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Submit Booking/i));

  expect(await screen.findByRole('alert')).toHaveTextContent(/Please select a movie and a time slot/i
  );
});

test("shows validation if no seats selected", async () => {
  render(<App />);

  // Select movie
  fireEvent.click(screen.getByText("Tenet"));
  // Select slot
  fireEvent.click(screen.getByText("10:00 AM"));
  // Submit without seats
  fireEvent.click(screen.getByText(/Submit Booking/i));

  expect(await screen.findByRole("alert")).toHaveTextContent(
    /Please select at least one seat/i
  );
});

test("shows validation if seat number invalid", async () => {
  render(<App />);

  fireEvent.click(screen.getByText("Tenet"));
  fireEvent.click(screen.getByText("10:00 AM"));

  // Enter invalid seat number > 10
  const seatInput = screen.getByLabelText("A1");
  fireEvent.change(seatInput, { target: { value: "15" } });

  // Submit
  fireEvent.click(screen.getByText(/Submit Booking/i));

  expect(await screen.findByRole("alert")).toHaveTextContent(
    /Please select at least one seat./i
  );
});

test("submits booking successfully with valid inputs", async () => {
  render(<App />);

  // Select movie and slot
  fireEvent.click(screen.getByText("Tenet"));
  fireEvent.click(screen.getByText("10:00 AM"));

  // Enter seat numbers
  fireEvent.change(screen.getByLabelText("A1"), { target: { value: "2" } });
  fireEvent.change(screen.getByLabelText("A2"), { target: { value: "1" } });

  fireEvent.click(screen.getByText(/Submit Booking/i));

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  const expectedPayload = {
    movie: "Tenet",
    slot: "10:00 AM",
    seats: { A1: 2, A2: 1, A3: 0, A4: 0, D1: 0, D2: 0 },
  };

  expect(fetch).toHaveBeenCalledWith(
    "https://book-my-show-3lr4.onrender.com/api/booking",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expectedPayload),
    })
  );

  expect(Swal.fire).toHaveBeenCalledWith(
    expect.objectContaining({
      title: expect.stringContaining("Booking Successful"),
      icon: "success",
    })
  );

  // Last booking details visible
  const lastBooking = screen.getByText(/Last Booking Details/i).parentElement;

  expect(lastBooking).toHaveTextContent(/Movie:\s*Tenet/i);
  expect(lastBooking).toHaveTextContent(/Slot:\s*10:00 AM/i);
  expect(lastBooking).toHaveTextContent(/A1:\s*2/i);
  expect(lastBooking).toHaveTextContent(/A2:\s*1/i);
  

  // Inputs reset after booking
  expect(screen.getByLabelText("A1")).toHaveValue(null);
  expect(screen.getByLabelText("A2")).toHaveValue(null);
});

test("shows alert if fetch fails", async () => {
  fetch.mockImplementationOnce(() => Promise.reject("API failure"));

  render(<App />);

  fireEvent.click(screen.getByText("Tenet"));
  fireEvent.click(screen.getByText("10:00 AM"));
  fireEvent.change(screen.getByLabelText("A1"), { target: { value: "1" } });

  fireEvent.click(screen.getByText(/Submit Booking/i));

  // Find alert by role only, then check its content
  expect(
    await screen.findByRole("alert")
  ).toHaveTextContent(/An error occurred during booking/i);
});
