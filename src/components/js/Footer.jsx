// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-links">
				<Link to="/about">About Us</Link>
				<Link to="/contact">Contact Us</Link>
				<Link to="/privacy">Privacy Policy</Link>
			</div>
			<div className="footer-text">
				&copy; {new Date().getFullYear()} MoviePass. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
