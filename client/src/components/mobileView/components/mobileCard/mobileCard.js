import React from 'react';
import PropTypes from 'prop-types';

import './mobileCard.scss';

import { SONGS, SETS, SONGS_SETS_LINK } from 'src/constants/routes.constants';
import DeleteService from 'src/services/delete.service';

import { Button, CardHr } from 'src/components/utils';

const MobileCard = ({
  id,
  title,
  description,
  handleUserUpdate,
  isSong,
  composer,
  arranger,
  isSet,
  songs
}) => {
  const handleDelete = async (table, itemId, linkId) => {
    await DeleteService.deleteSomething(table, itemId, linkId);

    handleUserUpdate();
  };

  const renderSongInfo = (
    <p className="comp-arr">
      <span className="composer">Composer: {composer || 'N/A'} | </span>
      <span className="arranger">Arranger: {arranger || 'N/A'}</span>
    </p>
  );

  const renderSongTitles = songs.map((song) => (
    <div key={song.song_title} className="mobile-song-title">
      <p className="song-title">{song.song_title}</p>
      <Button onClick={() => handleDelete(SONGS_SETS_LINK, song.id, id)}>Remove?</Button>
    </div>
  ));

  const dbTable = isSong ? SONGS[0] : SETS[0]

  return (
    <li className="mobile-card">
      <div className="mobile-card-title">
        <h3>{title}</h3>
        <Button onClick={() => handleDelete(dbTable, id)}>Delete?</Button>
      </div>
      <CardHr />
      <article className="expanded-card">
        {isSong && renderSongInfo}
        {isSet && renderSongTitles}
        <h5>Description:</h5>
        <p>{description}</p>
      </article>
    </li>
  );
};

export default MobileCard;

MobileCard.defaultProps = {
  isSong: false,
  composer: null,
  arranger: null,
  isSet: false,
  songs: []
};

MobileCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleUserUpdate: PropTypes.func.isRequired,
  isSong: PropTypes.bool,
  composer: PropTypes.string,
  arranger: PropTypes.string,
  isSet: PropTypes.bool,
  songs: PropTypes.arrayOf(PropTypes.object)
};
