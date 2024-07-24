import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			const moviesCollection = collection(db, "movies");
			const movieSnapshot = await getDocs(moviesCollection);
			const movieList = movieSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setMovies(movieList);
		};

		fetchMovies();
	}, []);

	return (
		<div>
			<div className="movie-list">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

const MovieCard = ({ movie }) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const fetchImage = async () => {
			const imageRef = ref(storage, movie.image);
			try {
				const url = await getDownloadURL(imageRef);
				setImageUrl(url);
			} catch (error) {
				console.error("Error fetching image URL:", error);
			}
		};

		fetchImage();
	}, [movie.image]);

	return (
		<div className="movie-card">
			{imageUrl ? (
				<Link to={`/movie/${movie.id}`}>
					<img src={imageUrl} alt={movie.title} />
				</Link>
			) : (
				<p>Loading image...</p>
			)}
			<h2>{movie.title}</h2>
		</div>
	);
};

export default Home;
