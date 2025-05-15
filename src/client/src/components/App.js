import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Swal from 'sweetalert2';
import "../styles/bootstrap.min.css";
import { movies, slots, seats as seatTypes } from "./data";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(
    localStorage.getItem("movie") || null
  );
  const [selectedSlot, setSelectedSlot] = useState(
    localStorage.getItem("slot") || null
  );
  const [seatValues, setSeatValues] = useState(() => {
    const savedSeats = localStorage.getItem("seats");
    return savedSeats ? JSON.parse(savedSeats) : {};
  });
  const [lastBooking, setLastBooking] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("movie", selectedMovie || "");
    localStorage.setItem("slot", selectedSlot || "");
    localStorage.setItem("seats", JSON.stringify(seatValues));
  }, [selectedMovie, selectedSlot, seatValues]);

  const handleSeatChange = (type, value) => {
    const numValue = Number(value);
    if (!Number.isInteger(numValue) || numValue < 0 || numValue > 10) {
      setAlertMessage("Please enter a valid number between 0 and 10 for seats.");
      return;
    }

    setAlertMessage(""); // Clear alert on valid input
    setSeatValues((prevSeats) => {
      const updatedSeats = {
        ...prevSeats,
        [type]: numValue,
      };
      localStorage.setItem("seats", JSON.stringify(updatedSeats));
      return updatedSeats;
    });
  };

  const handleSubmit = async () => {
    if (!selectedMovie || !selectedSlot) {
      setAlertMessage("Please select a movie and a time slot.");
      return;
    }

    const hasAtLeastOneSeat = Object.values(seatValues).some(
      (seat) => Number(seat) > 0
    );

    if (!hasAtLeastOneSeat) {
      setAlertMessage("Please select at least one seat.");
      return;
    }

    const invalidSeats = Object.entries(seatValues).filter(
      ([_, value]) => !Number.isInteger(value) || value < 0 || value > 10
    );

    if (invalidSeats.length > 0) {
      setAlertMessage("Invalid seat values. Please ensure all seat numbers are between 0 and 10.");
      return;
    }

    setAlertMessage(""); // Clear alert if everything is valid

    const bookingData = {
      movie: selectedMovie,
      slot: selectedSlot,
      seats: {
        A1: seatValues.A1 || 0,
        A2: seatValues.A2 || 0,
        A3: seatValues.A3 || 0,
        A4: seatValues.A4 || 0,
        D1: seatValues.D1 || 0,
        D2: seatValues.D2 || 0,
      },
    };

    console.log("Booking Data Sent:", bookingData);

    try {
      const response = await fetch(
        "https://book-my-show-3lr4.onrender.com/api/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLastBooking(bookingData);
        setSelectedMovie(null);
        setSelectedSlot(null);
        setSeatValues({});
        localStorage.clear();
      }
      Swal.fire({
        title: '🎉 Booking Successful!',
        text: 'Your tickets have been booked successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'sweetalert-popup',
        },
      });

    } catch (error) {
      console.error("Error during booking:", error);
      setAlertMessage("An error occurred during booking. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Book that show !!</h1>

      {alertMessage && (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      )}

      <div className="container">
        {/* Left Section */}
        <div className="left-section">
          <div className="movies">
            <div className="movie-row">
              <h2>Select a Movie</h2>
              {movies.map((movie) => (
                <div
                  key={movie}
                  className={`movie-column ${selectedMovie === movie ? "movie-column-selected" : ""
                    }`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <h6>{movie}</h6>
                </div>
              ))}
            </div>
          </div>

          <div className="slots">
            <div className="slot-row">
              <h2>Select a Time Slot</h2>
              {slots.map((slot) => (
                <div
                  key={slot}
                  className={`slot-column ${selectedSlot === slot ? "slot-column-selected" : ""
                    }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <h6>{slot}</h6>
                </div>
              ))}
            </div>
          </div>

          <div className="seats">
            <div className="seat-row">
              <h2>Select the seats</h2>
              {seatTypes.map((type) => (
                <div key={type} className="seat-column">
                  <label htmlFor={`seat-${type}`}>{type}</label>
                  <input
                    id={`seat-${type}`}
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    value={seatValues[type] || ""}
                    onChange={(e) => handleSeatChange(type, e.target.value)}
                  />
                </div>
              ))}

            </div>
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Booking
          </button>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>Last Booking Details</h2>
          {lastBooking ? (
            <div className="lastBooking">
              <p>
                <strong>Movie:</strong> {lastBooking.movie}
              </p>
              <p>
                <strong>Slot:</strong> {lastBooking.slot}
              </p>
              <p>
                <strong>Seats:</strong>
              </p>
              <ul>
                {Object.entries(lastBooking.seats).map(([seat, count]) => (
                  <li key={seat}>
                    {seat}: {count}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No previous booking found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
