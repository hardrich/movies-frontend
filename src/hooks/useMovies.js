import { useState, useRef, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies.js';

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([]);
  const previousQuery = useRef(query);

  const getMovies = useCallback(async ({ query }) => {
    if (previousQuery.current === query) return;
    previousQuery.current = query;
    const response = await searchMovies({ query });
    setMovies(response);
  }, []);

  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [sort, movies]); 

  return { movies: sortedMovies, getMovies };
}