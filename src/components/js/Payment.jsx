import React from "react";
import PropTypes from "prop-types";

const Payment = ({
	selectedSeats,
	seatCost,
	handleCheckout,
	paymentProcessed,
}) => {
	return (
		<button
			className="checkout-button centered"
			onClick={handleCheckout}
			disabled={!selectedSeats.length || paymentProcessed}
		>
			Pay Rs. {selectedSeats.length * seatCost}
		</button>
	);
};

Payment.propTypes = {
	selectedSeats: PropTypes.array.isRequired,
	seatCost: PropTypes.number.isRequired,
	handleCheckout: PropTypes.func.isRequired,
	paymentProcessed: PropTypes.bool.isRequired,
};

export default Payment;
