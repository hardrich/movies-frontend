import { useState, useRef } from 'react';
import { searchMovies } from '../services/movies.js';

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  const previousQuery = useRef(query);

  const getMovies = async () => {
    if (previousQuery.current === query) return;
    previousQuery.current = query;
    const response = await searchMovies({ query });
    setMovies(response);
  };

  return { movies, getMovies };
}