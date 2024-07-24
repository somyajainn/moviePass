import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Home from "./components/js/Home";
import Login from "./components/js/Login";
import Register from "./components/js/Register";
import MovieDetails from "./components/js/movieDetails";
import BookSeats from "./components/js/BookSeats";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/js/Navbar";
import Footer from "./components/js/Footer";
import { AuthProvider } from "./AuthContext.js";

function App() {
	return (
		<Router>
			<AuthProvider>
				<div className="App">
					<Navbar />
					<div className="content">
						<Routes>
							<Route path="/" element={<Navigate to="/home" />} />
							<Route path="/home" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/movie/:id" element={<MovieDetails />} />
							<Route path="/book-seats/:id" element={<BookSeats />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</AuthProvider>
		</Router>
	);
}

export default App;
