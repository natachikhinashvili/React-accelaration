import './App.css';
import Airports from "./Airports";
import Country from './Country';
import Currency from './Currency';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./Home";


function App() {
  
  const router = createBrowserRouter([
    { 
      path: '/', 
      element: <Home/>,
      children: [
        {path: "/:countrycode", element: <Currency />},
        {path:"/:countrycode/airports", element: <Airports />},
      ],
  },
  
  ])
  return <RouterProvider router={router}/>;
}

export default App;
