import { useState, useEffect } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const { movies } = useMovies();
  const [query, setQuery] = useState('');
  const [errorQuery, setErrorQuery] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = Object.fromEntries(new window.FormData(event.target));
    console.log(query);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setErrorQuery(null);
    if (query.startsWith(' ')) {
      setErrorQuery('Do not start with space');
    }
  }, [query]);

  return (
    <div className='page'>
      <header>
        <h1>Search your movie</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input value={query} onChange={handleQueryChange} name='query' placeholder='Star Wars, Spider Man, ...' />
          <button type='submit'>Search</button>
        </form>
        {
          errorQuery ? <p>{errorQuery}</p> : <></>
        }
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
