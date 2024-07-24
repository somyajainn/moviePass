import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig";
import "../css/moviedetails.css";

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const movieDoc = await getDoc(doc(db, "movies", id));
				if (movieDoc.exists()) {
					const movieData = movieDoc.data();
					setMovie(movieData);

					const imageRef = ref(storage, movieData.image);
					try {
						const url = await getDownloadURL(imageRef);
						setImageUrl(url);
					} catch (error) {
						console.error("Error fetching image URL:", error);
					}
				} else {
					console.error("No such document!");
				}
			} catch (error) {
				console.error("Error fetching movie: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, [id]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="movie-details-container">
			<div className="movie-details">
				{movie ? (
					<>
						<div className="movie-image-container">
							{imageUrl ? (
								<img src={imageUrl} alt={movie.title} className="movie-image" />
							) : (
								<p>Loading image...</p>
							)}
						</div>
						<div className="movie-details-info">
							<h1>{movie.title}</h1>
							<p>
								<strong>Description:</strong> {movie.Description}
							</p>
							<p>
								<strong>Genre:</strong> {movie.genre}
							</p>
							<p>
								<strong>Rating:</strong> {movie.rating}
							</p>
							<a href={`/book-seats/${id}`} className="book-seats-button">
								Book Seats
							</a>
						</div>
					</>
				) : (
					<p>Movie not found</p>
				)}
			</div>
		</div>
	);
};

export default MovieDetails;
