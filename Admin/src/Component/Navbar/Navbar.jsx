import React from 'react'
import './Navbar.css'
import navlogo from "../../assets/nav-logo.svg"
import navProfile from "../../assets/nav-profile.svg"
const Navbar = () => {
  return (
    <div className="navbar">
        {/* <img src={navlogo} alt="" className="nav-logo" /> */}
        <h2>WINTRA: Admin Panel</h2>
        {/* <img src={navProfile}  className='nav-profile' alt="" /> */}
    </div>
  )
}

export default Navbar