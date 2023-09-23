import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Country from "./Country";
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import * as React from 'react';

export default function Home(props){
    const [countries, setCountres] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('')


  
    const handleSelectChange = (event) => {
        let index = event.target.selectedIndex -1;
        setSelectedCountry(countries[index]);
    };
    
    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}, ${longitude}&key=AIzaSyBNfH4PIY_0Y6V2um4hqf9eilqjD5pqakI`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  if(data.status != "REQUEST_DENIED"){
                    setSelectedCountry(data);
                  }else{
                    setError(data);
                  }
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
                console.log(data)
              setCountres(data)
            })
            .catch(error => {
              console.error('Fetch error:', error);
            });

        }, [selectedCountry, navigate])
  
    return (
      <div className="App">
        <div id='container'>
        <select id="country-dropdown" onChange={handleSelectChange}>
          <option value="">Select a country</option> 
          {countries ? countries.map((country, index) => (
            <option key={index} value={index}>{country.name.common}
            </option>
          )): <p>Loading...</p>}
          </select>
          <div id='country_info'>
            <Country props={selectedCountry}/>
          </div>

          <div>
            <Navigation props={selectedCountry}/>
          <Outlet/>
          </div>
        </div>
      </div>
    );
}