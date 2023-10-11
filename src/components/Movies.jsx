import PropTypes from 'prop-types'

function MoviesList({ movies }) {
  return (
    <ul>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

function MoviesNotResults() {
  return <p>No results</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return (
    hasMovies
      ? <MoviesList movies={movies} />
      : <MoviesNotResults />
  )
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired
}
