import React, { useContext } from 'react';

import './songsView.scss';

import { DatabaseContext } from 'src/context/databaseContext';
import { SONGS } from 'src/constants/routes.constants';

import { DeleteService } from 'src/services';

import { CardHr, Button } from 'src/components/utils';

type DeleteFunc = (table: typeof SONGS[0], id: number) => Promise<void>;

const SongView = () => {
  const { songs, handleUserUpdate } = useContext(DatabaseContext);

  const handleDelete: DeleteFunc = async (table, id) => {
    try {
      await DeleteService.deleteSomething(table, id);

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCards = songs.map((song) => (
    <div key={song.id} className="song-card">
      <h3>{song.song_title}</h3>
      <CardHr />
      <article className="song-info">
        <p className="composer">Composer: {song.composer || 'N/A'}</p>
        <p className="arranger">Arranger: {song.arranger || 'N/A'}</p>
        <h5>Description:</h5>
        <p>{song.description}</p>
      </article>
      <Button onClick={() => handleDelete(SONGS[0], song.id)}>
        Delete Song?
      </Button>
    </div>
  ));

  return <div className="song-container">{renderCards}</div>;
};

export default SongView;
