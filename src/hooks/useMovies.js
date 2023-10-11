import results from '../mocks/results.json';

export function useMovies() {
  const mappedMovies = results.Search.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  return { movies: mappedMovies };
}