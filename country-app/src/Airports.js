import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchField from './SearchField';

export default function Airports(props){
  const [airports, setAirports] = useState(false);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSearch = (query) => {
    const filteredItems = airports.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())
  );
    setTimeout(() => {
      setSearchResults(filteredItems);
    }, 500);
  };

    useEffect(() => {

      const pathSegments = location.pathname.split('/');
      const baseRoute = `/${pathSegments[1]}`;
      console.log(baseRoute)
        const apiKey = 'h8uTWSA848mnRayxgmHnkw==FuGU6m718sK5w7xR';

        // Create the URL with query parameters
        const apiUrl = `https://api.api-ninjas.com/v1/airports?country=${baseRoute.substring(1)}`;
    
        fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setAirports(data);
            setSearchResults(data);
            setLoading(false)
            // Handle the data here
          })      
          .catch((error) => {
            console.error('Fetch Error:', error);
          });    
      }, []);
    return (
        <div id="airports-container">
          <div>
              <h1>Search App</h1>
              <SearchField onSearch={handleSearch} />
            </div>
          <div>
            {loading ?  <p>Loading...</p> :
              searchResults && searchResults.map(element => (
                <div>
                  <p>{element.iata} - {element.name}</p>
                </div>
              ))
            }
            {searchResults && searchResults.length == 0 && <p style={{color: 'red'}}>There are no airports found 😟</p>}
          </div>
        </div>
    )
}