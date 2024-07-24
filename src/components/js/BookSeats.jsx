import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../css/bookseats.css";
import Payment from "./Payment";

const BookSeats = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [paymentProcessed, setPaymentProcessed] = useState(false);
	const seatCost = 500;

	const handleSeatSelect = (seat) => {
		if (paymentProcessed) return;

		setSelectedSeats((prevSeats) =>
			prevSeats.includes(seat)
				? prevSeats.filter((s) => s !== seat)
				: [...prevSeats, seat]
		);
	};

	const handleCheckout = async () => {
		if (!selectedSeats.length) return;

		const amount = selectedSeats.length * seatCost;

		const options = {
			key: "",
			amount: amount * 100,
			currency: "INR",
			name: "Movie Booking",
			description: "Book your seats",
			handler: function (response) {
				alert("Payment successful!");
				setPaymentProcessed(true);
			},
			prefill: {
				name: "Somya",
				email: "somyajain433@gmail.com",
				contact: "9259053566",
			},
			theme: {
				color: "#f84464",
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	return (
		<div className="booking-page">
			<h1 className="centered">Book Your Seats</h1>
			<div className="seat-status centered">
				<div className="status-indicator available">Available</div>
				<div className="status-indicator booked">Booked</div>
				<div className="status-indicator selected">Selected</div>
			</div>
			<div className="seat-layout">
				{Array.from({ length: 10 }, (_, rowIndex) => (
					<div key={rowIndex} className="seat-row">
						<span className="row-number">
							{String.fromCharCode(65 + rowIndex)}
						</span>
						{Array.from({ length: 10 }, (_, colIndex) => {
							const seat = `${String.fromCharCode(65 + rowIndex)}${
								colIndex + 1
							}`;
							return (
								<div
									key={seat}
									className={`seat ${
										selectedSeats.includes(seat) ? "selected" : "available"
									}`}
									onClick={() => handleSeatSelect(seat)}
								/>
							);
						})}
					</div>
				))}
				<div className="col-numbers">
					{Array.from({ length: 10 }, (_, colIndex) => (
						<span key={colIndex} className="col-number">
							{colIndex + 1}
						</span>
					))}
				</div>
			</div>
			<Payment
				selectedSeats={selectedSeats}
				seatCost={seatCost}
				handleCheckout={handleCheckout}
				paymentProcessed={paymentProcessed}
			/>
		</div>
	);
};

export default BookSeats;
