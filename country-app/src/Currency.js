import React, { useEffect, useState } from 'react';

export default function Currency(){
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('');
  const [res, setres] = useState(0)
  const [amount, setAmount] = useState(0);
  async function getConvertedData(){
    const API_URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const result = await fetch(API_URL);
    const data = await result.json();
    setres(data.result)
  }
  getConvertedData();
  useEffect(() => {

  }, []);

  return (
    <div id='currency-container'>
      <h1>Currency Exchange</h1>
      <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      <input value={to} onChange={(e) => setTo(e.target.value)}/>
      <button onClick={getConvertedData}>convert</button>
      <p>{res}</p>
    </div>
  );
};