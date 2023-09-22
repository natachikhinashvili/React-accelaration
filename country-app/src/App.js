import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountres] = useState(false);
  
 useEffect(() => {
  fetch('https://restcountries.com/v3.1/all')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setCountres(data)
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
  },[]);
  return (
    <div className="App">
      <div>
        <select>
          <option value="">Select a country</option>
          {countries && countries.map(country => (
            <option key={country.name} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
        <div id='country_info'>

        </div>
        <div>
          <ul>
            <li>CURRENCY EXCHANGE</li>
            <li>AIRPORTS</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
