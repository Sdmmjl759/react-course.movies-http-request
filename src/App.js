import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie'

import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // const response = await fetch('https://swapi.dev/api/films/');
      const response = await fetch('https://react-course-http-reques-d48e8-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);

  const AddMovieHandler = async function (movie) {
    const response = await fetch('https://react-course-http-reques-d48e8-default-rtdb.firebaseio.com/movies.json', {
      method: 'post',
      body: JSON.stringify(movie),
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>loading...</p>}
        {!isLoading && movies.length > 0 && < MoviesList movies={movies} />}
        {!isLoading && !movies.length > 0 && !error && <p>found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

  // const fetchMoviesHandler = function () {
  //   fetch('https://swapi.dev/api/films')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const transformedMovies = data.results.map(movieData => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date
  //         }
  //       })
  //       setMovies(transformedMovies);
  //     })
  // }