import { useEffect } from "react";
export default function Airports(props){
    useEffect(() => {
        const apiKey = 'h8uTWSA848mnRayxgmHnkw==FuGU6m718sK5w7xR';

        // Create the URL with query parameters
        console.log(props)
        const apiUrl = `https://api.api-ninjas.com/v1/airports?name=${encodeURIComponent(props)}`;
    
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
            // Handle the data here
          })      
          .catch((error) => {
            console.error('Fetch Error:', error);
          });
      }, []);
    return (
        <div id="airports-container">
          <h1>Airports</h1>
        </div>
    )
}