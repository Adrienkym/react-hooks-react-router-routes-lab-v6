import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]); // To link movies to directors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch directors
    fetch('http://localhost:3000/directors')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setDirectors(data);
        // After fetching directors, fetch movies
        return fetch('http://localhost:3000/movies');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading directors...</p>;
  if (error) return <p>Error loading directors: {error.message}</p>;

  // Helper function to get movie titles for a director
  const getMoviesForDirector = (directorId) => {
    return movies
      .filter(movie => movie.directorId === directorId)
      .map(movie => movie.title);
  };

  return (
    <div>
      <NavBar />
      <h1>Directors Page</h1>
      {directors.map(director => (
        <article key={director.id}>
          <h2>{director.name}</h2>
          <ul>
            {getMoviesForDirector(director.id).length > 0 ? (
              getMoviesForDirector(director.id).map((movieTitle, index) => (
                <li key={index}>{movieTitle}</li>
              ))
            ) : (
              <li>No movies found for this director.</li>
            )}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default Directors;