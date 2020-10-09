import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './homeCard.scss'

const HomeCard = ({ route, title }) => {
  return (
    <div className="home-card">
      <Link to={route}>
        <h2>{title}</h2>
      </Link>
    </div>
  );
};

HomeCard.propTypes = {
  route: PropTypes.oneOf(['/songs', '/sets', '/gigs']).isRequired,
  title: PropTypes.oneOf(['Songs', 'Sets', 'Gigs']).isRequired
};

export default HomeCard;
