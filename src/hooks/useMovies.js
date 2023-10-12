import { useState } from 'react';
import { searchMovies } from '../services/movies.js';

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await searchMovies({ query });
    setMovies(response);
  };

  return { movies, getMovies };
}