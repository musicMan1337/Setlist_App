import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss'

const Header = () => {
  return (
    <header className="main-header">
      <nav className="nav-bar">
        <p className="nav-links">
          <Link to="/songs">Songs | </Link>
          <Link to="/sets">Set-Lists | </Link>
          <Link to="/gigs">Gigs </Link>
        </p>

        <div className="avatar-div">
          <img src="#" alt="avatar" className="user-avatar" />
          <Link to="/login">Logout</Link>
        </div>
      </nav>

      <h1 className="headline">SET-LIST APP (LOGIN)</h1>
    </header>
  );
};

export default Header;
