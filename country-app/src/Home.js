import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Country from "./Country";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import * as React from 'react';

export default function Home(){
    const location = useLocation();
    const [countries, setCountres] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const pathSegments = location.pathname.split('/');
    const baseRoute = `/${pathSegments[1]}`;

  
    const handleSelectChange = (event) => {
      const selectedIndex = event.target.selectedIndex;
      setSelectedCountry(countries[selectedIndex -1]);
      navigate(selectedCountry.cca2)
    };
    
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
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                // Retrieve the latitude and longitude from the position object
                const { latitude, longitude } = position.coords;
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}, ${longitude}&key=AIzaSyBNfH4PIY_0Y6V2um4hqf9eilqjD5pqakI`)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      return response.json();
                    })
                    .then(data => {
                      console.log(data)
                    })
                    .catch(error => {
                      console.error('Fetch error:', error);
                    });
              },
              (error) => {
                setError(error);
              }
            );
          } else {
            setError('Geolocation is not available in this browser.');
          }

        }, [])
  
    return (
      <div className="App">
        <div id='container'>
        <select onChange={handleSelectChange}>
          <option value="">Select a country</option>
          {countries ? countries.map((country, index) => (
            <option key={index} value={index}>
              {country.name.common}
            </option>
          )): <p>Loading...</p>}
          </select>
          <div id='country_info'>
            <Country/>
          </div>
          <div>
            {selectedCountry &&<Navigation props={selectedCountry}/>}
            <Outlet/>
          </div>
        </div>
      </div>
    );
}