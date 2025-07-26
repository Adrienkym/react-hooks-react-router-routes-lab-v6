import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Movie() {
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]); // Re-run effect if ID changes

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error loading movie: {error.message}</p>;
  if (!movie) return <p>Movie not found.</p>; // Handle case where movie data is null

  return (
    <div>
      <NavBar />
      <h1>{movie.title}</h1>
      <p>Time: {movie.time}</p>
      <div>
        {movie.genres.map((genre, index) => (
          <span key={index} style={{ marginRight: '10px', border: '1px solid #ccc', padding: '5px' }}>
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Movie;