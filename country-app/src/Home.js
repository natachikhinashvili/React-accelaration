import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Country from "./Country";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props){
    const [countries, setCountres] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(false);
    const [isrouted, setisRouted] =useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const baseRoute = `/${pathSegments[1]}`;


  
    const handleSelectChange = (event) => {
        let index = event.target.selectedIndex -1;
        setSelectedCountry(countries[index]);
    };
    
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