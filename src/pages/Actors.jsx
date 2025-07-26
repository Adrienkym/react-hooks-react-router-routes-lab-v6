import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

function Actors() {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch actors
    fetch('http://localhost:3000/actors')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActors(data);
        // After fetching actors, fetch movies
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

  if (loading) return <p>Loading actors...</p>;
  if (error) return <p>Error loading actors: {error.message}</p>;

  // Helper function to get movie titles for an actor
  const getMoviesForActor = (actorId) => {
    // Assuming movies have an array of actor IDs or a similar structure
    return movies
      .filter(movie => movie.actorIds && movie.actorIds.includes(actorId))
      .map(movie => movie.title);
  };

  return (
    <div>
      <NavBar />
      <h1>Actors Page</h1>
      {actors.map(actor => (
        <article key={actor.id}>
          <h2>{actor.name}</h2>
          <ul>
            {getMoviesForActor(actor.id).length > 0 ? (
              getMoviesForActor(actor.id).map((movieTitle, index) => (
                <li key={index}>{movieTitle}</li>
              ))
            ) : (
              <li>No movies found for this actor.</li>
            )}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default Actors;