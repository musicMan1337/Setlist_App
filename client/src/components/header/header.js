import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ userName }) => {
  return (
    <header className="main-header">
      <nav className="nav-bar">
        <p className="nav-links">
          <Link to="/songs">Songs | </Link>
          <Link to="/sets">Set-Lists | </Link>
          <Link to="/gigs">Gigs </Link>
        </p>

        <div className="avatar-div">
          {/* <img src="#" alt="avatar" className="user-avatar" /> */}
          <span>{userName} | </span>
          <Link to="/login">Logout</Link>
        </div>
      </nav>

      <Link to="/">
        <h1 className="headline">SET-LIST APP</h1>
      </Link>
    </header>
  );
};

export default Header;

Header.defaultProps = { userName: 'no user' }

Header.propTypes = {
  userName: PropTypes.string
};