import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Airports(props){
  const [airports, setAirports] = useState(false);
  const location = useLocation();

    useEffect(() => {
      console.log('here')
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
            // Handle the data here
          })      
          .catch((error) => {
            console.error('Fetch Error:', error);
          });
      }, []);
    return (
        <div id="airports-container">
          <h1>Airports</h1>
          <div>
            {
              airports && airports.map(element => (
                <div>
                  <p>{element.iata} - {element.name}</p>
                </div>
              ))
            }
          </div>
        </div>
    )
}