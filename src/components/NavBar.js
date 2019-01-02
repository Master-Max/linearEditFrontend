import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Nav.css';

const NavBar = () => {
  return (
    <div className="NavBar">
      <ul>
        <li><Link to="/">Logo Goes Here</Link></li>
        <li><Link to="/editor">Create Movie</Link></li>
        <li><Link to="/gallery">My Gallery</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/profile">Profile</Link></li>

      </ul>
    </div>
  )
}

export default NavBar
