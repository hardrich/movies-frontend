import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';

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
  const [sort, setSort] = useState(false);
  const { query, setQuery, errorQuery } = useSearch();
  const { movies, getMovies } = useMovies({ query, sort });

  const handleSubmit = async (event) => {
    event.preventDefault();
    getMovies({ query });
  };

  const debounceGetMovies = useCallback(debounce((query) => { getMovies({ query }) }, 500), []);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debounceGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className='page'>
      <header>
        <h1>Search your movie</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input style={{ border: '1px solid transparent', borderColor: errorQuery ? 'red' : 'transparent' }} value={query} onChange={handleQueryChange} name='query' placeholder='Star Wars, Spider Man, ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
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
