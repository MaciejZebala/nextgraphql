import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [result, setResult] = useState('');
  const [valid, setValid] = useState(false);
  const router = useRouter();
  const handleChange = e => {
    setResult(e.target.value);
    if (e.target.value) {
      setValid(true);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (valid) {
      router.push({
        pathname: '/search',
        query: {
          result
        }
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={result}
        onChange={handleChange}
        className="form__input"
        placeholder="Szukaj repozytorium.."
        required
      ></input>
      <button onClick={handleSubmit} className="form__btn">
        Wyszukaj
      </button>
    </form>
  );
};

export default SearchBar;
