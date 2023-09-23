import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

export default function Currency(){
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('');
  const [res, setres] = useState(0)
  const [amount, setAmount] = useState(0);
  const [currency, setcurrency]= useState('');
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const baseRoute = `${pathSegments[1]}`;

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
       data.map((element) => element.cca2 == baseRoute && setTo(Object.keys(element.currencies)[0]));
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }, [baseRoute]);

  return (
    <div id='currency-container'>
      <h1>Currency Exchange</h1>
      <label>
          from $:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>to:
      <input value={to} onChange={(e) => setTo(e.target.value)}/></label>      <p>{res} {to}</p> 
    </div>
  );
};