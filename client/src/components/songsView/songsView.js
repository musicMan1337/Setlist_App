import React, { useContext } from 'react';

import './songsView.scss'

import { DatabaseContext } from 'src/context/databaseContext';
import { CardHr } from 'src/components/utils';

const SongView = () => {
  const { songs } = useContext(DatabaseContext);

  const renderCards = songs.map((song) => (
    <div key={song.song_title} className="song-card">
      <h3>{song.song_title}</h3>
      <CardHr />
      <article className="song-info">
        <p className="composer">Composer: {song.composer || 'N/A'}</p>
        <p className="arranger">Arranger: {song.arranger || 'N/A'}</p>
        <h5>Description:</h5>
        <p>{song.description}</p>
      </article>
    </div>
  ));

  return <div className="song-container">{renderCards}</div>;
};

export default SongView;
