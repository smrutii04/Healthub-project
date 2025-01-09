import React from 'react'
import "./ShoppingHome.css";
import { FaAngleDown } from "react-icons/fa";

export default function CityDropdown() {
  return (
    <div>
       <button className="cityDropdown">
            <div className="info">
              <span>Your Location</span>
              <span className='bold'>Maharashtra</span>
            </div>
           <span className="ml-auto"> <FaAngleDown /></span>
          </button>
    </div>
  )
}
