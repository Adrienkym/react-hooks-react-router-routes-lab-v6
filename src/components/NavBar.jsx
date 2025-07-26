
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "active-link active" : ""}>Home</NavLink>
      <NavLink to="/directors" className={({ isActive }) => isActive ? "active-link active" : ""}>Directors</NavLink>
      <NavLink to="/actors" className={({ isActive }) => isActive ? "active-link active" : ""}>Actors</NavLink>
    </nav>
  );
}

export default NavBar;
