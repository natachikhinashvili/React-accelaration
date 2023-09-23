import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

export default function Currency(){
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('');
  const [res, setres] = useState(0)
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const baseRoute = `${pathSegments[1]}`;
  const [countries, setCountres] = useState(false);

  async function getConvertedData(){
    const API_URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const result = await fetch(API_URL);
    const data = await result.json();
    setres(data.result)
  }
  getConvertedData();
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')            
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setCountres(data);
       data.map((element) => element.cca2 == baseRoute && setTo(Object.keys(element.currencies)[0]));
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }, [baseRoute]);
  function handleSelectChange(e){
    let curr = Object.keys(countries[e.target.value].currencies)[0];
    setTo(curr);
  }

  return (
    <div id='currency-container'>
      <h1>Currency Exchange</h1>
      <select id="selectcurr" onChange={(e) => handleSelectChange(e)}>
          <option value="">Select a country</option> 
          {countries ? countries.map((country, index) => (
              <option key={index} value={index}>{country.name.common}
              </option>
          )): <p>Loading...</p>}
          </select>
          <footer id="currencyfooter">
      <label>
          USD:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      <h1><b> = </b></h1>      
      <p>{res} {to}</p> 
      </footer>
    </div>
  );
};