import React from 'react';
import { Link } from "react-router-dom";
import "./ShoppingHome.css";
import CityDropdown from './CityDropdown';
import SearchBox from './SearchBox';
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import Navigation from './Navigation';

export default function ShoppingNavbar() {
  return (
    <>
      <header className="navbar">
        <div className="logoWrapper">
          <Link to="/">
            <div className="logo">HealthHub</div>
          </Link>
        </div>

        <div className="part2">
          <CityDropdown/>
            <SearchBox/>
            

            <div className="part3 d-flex align-items-center ml-auto tab">
              
              <button className="circle mr-3 profile"><FiUser/></button>
              <div className="ml-auto cartTab">
                <span className="price" >$3.29</span>
                <div className="position-relative ml-2">
                <button className="circle ml-2 bag bagBackground "><IoBagOutline/></button>
                <span className="count d-flex align-items-center justify-content-center">1</span>
                </div>

              </div>
            </div>

        </div>
      </header>

    <Navigation/>

    </>
  );
}
