import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWithGoogle";
import "../../components/css/Auth.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			window.location.href = "/MovieDetails";
			toast.success("User logged in Successfully", {
				position: "top-center",
			});
		} catch (error) {
			toast.error(error.message, {
				position: "bottom-center",
			});
		}
	};

	return (
		<div className="auth-container  auth-page">
			<form onSubmit={handleSubmit} className="auth-form">
				<h3 className="auth-header">Login</h3>

				<div className="mb-3">
					<label className="form-label">Email address</label>
					<input
						type="email"
						className="form-control"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="d-grid">
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</div>
				<p className="forgot-password">
					New user? <a href="/register">Register Here</a>
				</p>
				<SignInwithGoogle />
			</form>
		</div>
	);
}

export default Login;
