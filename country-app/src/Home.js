import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Country from "./Country";
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useRef } from 'react';

export default function Home() {
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const cache = useRef({});

  // Effect to fetch countries data
  useEffect(() => {
            if (selectedCountry) {
            navigate(`/${selectedCountry.cca2}`);
          }
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  // Effect to handle geolocation
  useEffect(() => {
    if (selectedCountry) {
      navigate(`/${selectedCountry.cca2}`);
    }
    if ("geolocation" in navigator && countries && !isSelected) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const cacheKey = `${latitude}-${longitude}`;
          
          // Check if the response is cached
          if (cache.current[cacheKey]) {
            setSelectedCountry(cache.current[cacheKey]);
          } else {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBI5ZsMHPmb2o1SESN22PJi_Dqaba6CeYY`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                if (data.status !== "REQUEST_DENIED") {
                  const foundCountry = countries.find(element => element.name.common === data.results[data.results.length - 1].formatted_address);
                  setSelectedCountry(foundCountry);
                  cache.current[cacheKey] = data; // Cache the response
                  navigate(`/${foundCountry.cca2}`);
                } else {
                  setError(data);
                }
              })
              .catch(error => {
                console.error('Fetch error:', error);
              });
          }
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      setError('Geolocation is not available in this browser.');
    }
  }, [countries, isSelected, navigate]);

  // Function to handle select change
  const handleSelectChange = (event) => {
    const index = event.target.selectedIndex - 1;
    setIsSelected(true);
    setSelectedCountry(countries[index]);
  };

  return (
    <div className="App">
      <div id='container'>
        <select id="country-dropdown" onChange={handleSelectChange}>
          <option value="">Select a country</option>
          {countries ? countries.map((country, index) => (
            <option key={index} value={index}>{country.name.common}</option>
          )) : <p>Loading...</p>}
        </select>
        <div id='country_info'>
          <Country props={selectedCountry} />
        </div>
        <div>
          <Navigation props={selectedCountry} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}