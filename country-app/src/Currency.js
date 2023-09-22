import React, { useEffect, useState } from 'react';

export default function Currency(){
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://exchangerate.host/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setExchangeRates(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('No Data Found 😟');
      }
    };
    const timeout = setTimeout(() => {
      setError('Request timed out. Please try again later. 😟');
    }, 10000);
    fetchData();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id='currency-container'>
      <h1>Currency Exchange</h1>
      {error ? (
        <p>{error}</p>
      ) : exchangeRates && (
        <ul>
          {Object.keys(exchangeRates.rates).map((currency) => (
            <li key={currency}>
              {currency}: {exchangeRates.rates[currency]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};