import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function useSearch() {
  const [query, setQuery] = useState('');
  const [errorQuery, setErrorQuery] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === '';
      return;
    }
    if (query === '') {
      setErrorQuery('Type something');
      return;
    }
    if (query.startsWith(' ')) {
      setErrorQuery('Do not start with space');
      return;
    }
    setErrorQuery(null);
  }, [query]);

  return { query, setQuery, errorQuery };
}

function App() {
  const { query, setQuery, errorQuery } = useSearch();
  const { movies, getMovies } = useMovies({ query });

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const data = Object.fromEntries(new window.FormData(event.target));
    await getMovies()
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='page'>
      <header>
        <h1>Search your movie</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input style={{ border: '1px solid transparent', borderColor: errorQuery ? 'red' : 'transparent' }} value={query} onChange={handleQueryChange} name='query' placeholder='Star Wars, Spider Man, ...' />
          <button type='submit'>Search</button>
        </form>
        {
          errorQuery ? <p style={{ color: 'red', margin: 0 }}>{errorQuery}</p> : <></>
        }
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
