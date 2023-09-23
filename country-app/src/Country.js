import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Country(){
    const [countries, setCountries] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const baseRoute = `/${pathSegments[1]}`;
        console.log(baseRoute)
          const apiKey = 'h8uTWSA848mnRayxgmHnkw==FuGU6m718sK5w7xR';
  
          // Create the URL with query parameters
          const apiUrl = `https://restcountries.com/v3.1/alpha/${baseRoute.substring(1)}`;
      
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
              setCountries(data[0]);
              // Handle the data here
            })      
            .catch((error) => {
              console.error('Fetch Error:', error);
            });        
    },[])
    return (
        <div>   
            {countries && (<>
             <div id="header">
            <h1>{countries.name.common}</h1>
            <h2>{countries.flag}</h2>
            </div>
            <div id="content">
                <div>
                    <p><b>Capital: </b>{countries.capital[0]}</p>
                    <p><b>Continent: </b>{countries.continents[0]}</p>
                </div>
                <div>
                    <p><b>Population: </b>{countries.population}</p>
                    <p><b>Region: </b>{countries.region}</p>
                    <div id="border-container">
                    <p><b>Borders: </b></p>
                    <div id="borders">
                        {countries.borders &&
                            countries.borders.map(element =>(
                                <p>{element}, </p>
                            ))
                        }
                    </div>
                    </div>
                </div>
            </div>
            </>)}
        </div>
    )
}