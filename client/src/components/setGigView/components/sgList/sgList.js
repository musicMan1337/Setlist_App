import React from 'react';
import PropTypes from 'prop-types';

import { SetGigList } from 'src/components/utils/lists';
import { CardHr, Button } from 'src/components/utils/tools';

const SGList = ({ listTable, buttonText }) => {
  const renderListItems = listTable.map((item) => {
    if (buttonText.includes('Set')) {
      const song = item;
      return (
        <li key={song.song_title} className="set-gig-card">
          <h3>{song.song_title}</h3>
          <CardHr />
          <article className="expanded-card">
            <p className="composer">Composer: {song.composer || 'N/A'}</p>
            <p className="arranger">Arranger: {song.arranger || 'N/A'}</p>
            <h5>Description:</h5>
            <p>{song.description}</p>
            <Button>{buttonText}</Button>
          </article>
        </li>
      );
    }

    const set = item;
    return (
      <li key={set.set_name} className="set-gig-card">
        <h3>{set.set_name}</h3>
        <CardHr />
        <article className="expanded-card">
          <h5>Description:</h5>
          <p>{set.description}</p>
          <Button>{buttonText}</Button>
        </article>
      </li>
    );
  });

  return <SetGigList>{renderListItems}</SetGigList>;
};

export default SGList;

SGList.propTypes = {
  listTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.oneOf(['Add to Set', 'Add to Gig']).isRequired
};
