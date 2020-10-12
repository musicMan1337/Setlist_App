import React from 'react';
import PropTypes from 'prop-types';

import { CardHr } from 'src/components/utils/tools/tools';

const MobileCard = ({ title, description, isSong, composer, arranger }) => {
  const renderSongInfo = (
    <p className="comp-arr">
      <span className="composer">Composer: {composer || 'N/A'} | </span>
      <span className="arranger">Arranger: {arranger || 'N/A'}</span>
    </p>
  );

  return (
    <li className="modile-card">
      <h3>{title}</h3>
      <CardHr />
      <article className="expanded-card">
        {isSong && renderSongInfo}
        <h5>Description:</h5>
        <p>{description}</p>
      </article>
    </li>
  );
};

export default MobileCard;

MobileCard.defaultProps = { isSong: false, composer: null, arranger: null };

MobileCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isSong: PropTypes.bool,
  composer: PropTypes.string,
  arranger: PropTypes.string
};
