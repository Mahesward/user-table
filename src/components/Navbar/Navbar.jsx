import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Navbar() {
  return (
    <div>
      <nav className="nav">
        <ul className="nav-bar">
          <li className="nav-button-home">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="nav-button-services">
            <Link to="/add-data" className="link">
              Add-Data
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
