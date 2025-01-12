import React from 'react'
import { IoIosMenu } from "react-icons/io"
import { Link } from 'react-router-dom'
import { CiHome } from 'react-icons/ci'

export default function Navigation() {
  return (
    <>
     <nav>
  <div className="container">
    <div className="row">
      <div className="col-sm-3 navPart1">
        <button className="allCatTab align-items-center">
          <span><IoIosMenu/></span>
          <span className='text'>ALL CATEGORIES </span>
        </button>
      </div>
      <div className="col-sm-9 navPart2">
    <ul className="list list-inline services">
        <li className="list-inline-item "> <Link to="/" className="list-element"><CiHome/> Home</Link></li>
        <li className="list-inline-item"> <Link to="/" className="list-element">Medicine</Link></li>
        <li className="list-inline-item"> <Link to="/" className="list-element">Lab Tests</Link></li>
        <li className="list-inline-item"> <Link to="/" className="list-element">Health Blogs</Link></li>
        <li className="list-inline-item"> <Link to="/" className="list-element">Contact Us</Link></li>
    </ul>
      </div>
    </div>
  </div>
</nav>
 
    </>
  )
}
