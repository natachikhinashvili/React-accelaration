import React, { useState } from 'react';

function SearchField({ onSearch }) {
  const [query, setQuery] = useState('');

  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  const debouncedSearch = debounce(onSearch, 500);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery); // Debounced API request
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={handleInputChange}
    />
  );
}

export default SearchField;
