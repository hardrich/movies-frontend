const API_KEY = '56bdb7ee';

export const searchMovies = async ({ query }) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const json = await response.json();
    return json.Search ? json.Search?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    })) : [];
  } catch (error) {
    console.log(error);
    throw new Error('Error searching movies');
  }
};
