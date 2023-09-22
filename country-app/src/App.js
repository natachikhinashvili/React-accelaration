import './App.css';
import Airports from "./Airports";
import Country from './Country';
import Currency from './Currency';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./Home";
import { useState } from "react"

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home/>,
    children: [
      {path: "/", element: <Currency />},
      {path:"/airports", element: <Airports />},
    ]
},

])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
