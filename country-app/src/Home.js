import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Country from "./Country";
import { Outlet } from 'react-router-dom';

export default function Home(){
    const [countries, setCountres] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

  
    const handleSelectChange = (event) => {
      const selectedIndex = event.target.selectedIndex;
      setSelectedCountry(countries[selectedIndex -1]);
      console.log(selectedCountry)
    };
    
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                // Retrieve the latitude and longitude from the position object
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
                console.log(latitude,longitude)
              },
              (error) => {
                setError(error);
              }
            );
          } else {
            setError('Geolocation is not available in this browser.');
          }
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}, ${longitude}&key=AIzaSyAd7y33-f02yNWfBzML_oQDh4KF0s4txLg`)
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
        }, [])
  
    return (
      <div className="App">
        <div id='container'>
        <select onChange={handleSelectChange}>
          <option value="">Select a country</option>
          {countries &&countries.map((country, index) => (
            <option key={index} value={index}>
              {country.name.common}
            </option>
          ))}
          </select>
          <div id='country_info'>
            {selectedCountry && <Country country={selectedCountry}/>}
          </div>
          <div>
            {selectedCountry &&<Navigation props={selectedCountry}/>}
            <Outlet/>
          </div>
        </div>
      </div>
    );
}