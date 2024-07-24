import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInWithGoogle() {
	const googleLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
					email: user.email,
					firstName: user.displayName,
					photo: user.photoURL,
					lastName: "",
				});
				toast.success("User logged in Successfully", {
					position: "top-center",
				});
				window.location.href = "/MovieDetails";
			}
		} catch (error) {
			console.error("Error during Google sign-in", error);
			toast.error(error.message, {
				position: "bottom-center",
			});
		}
	};

	return (
		<div>
			<p className="continue-p">--Or continue with--</p>
			<div
				style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
				onClick={googleLogin}
			>
				<img
					src={require("../../google.png")}
					width={"60%"}
					alt="Google sign-in"
				/>
			</div>
		</div>
	);
}

export default SignInWithGoogle;
