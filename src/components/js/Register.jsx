import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../../components/css/Auth.css";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
					email: user.email,
					firstName: fname,
					lastName: lname,
				});
			}
			toast.success("User Registered Successfully!!", {
				position: "top-center",
			});
		} catch (error) {
			toast.error(error.message, {
				position: "bottom-center",
			});
		}
	};

	return (
		<div className="auth-container auth-page">
			<form onSubmit={handleRegister} className="auth-form">
				<h3 className="auth-header">Sign Up</h3>

				<div className="mb-3">
					<label className="form-label">First name</label>
					<input
						type="text"
						className="form-control"
						placeholder="First name"
						onChange={(e) => setFname(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Last name</label>
					<input
						type="text"
						className="form-control"
						placeholder="Last name"
						onChange={(e) => setLname(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Email address</label>
					<input
						type="email"
						className="form-control"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<div className="d-grid">
					<button type="submit" className="btn btn-primary">
						Sign Up
					</button>
				</div>
				<p className="forgot-password">
					Already registered? <a href="/login">Login</a>
				</p>
			</form>
		</div>
	);
}

export default Register;
