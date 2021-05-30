import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [result, setResult] = useState('');
  const router = useRouter();
  const handleChange = e => {
    setResult(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {
        result
      }
    });
  };

  return (
    <form>
      <input value={result} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Wyszukaj</button>
    </form>
  );
};

export default SearchBar;
