// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<Link to="/">MoviePass</Link>
			</div>
			<div className="navbar-links">
				<Link to="/login" className="navbar-button">
					Login
				</Link>
				<Link to="/register" className="navbar-button">
					Register
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
