import React from 'react';

import './mobileCard.scss';

import { SONGS, SETS, SONGS_SETS_LINK } from 'src/constants/routes.constants';
import { DeleteService, PostService } from 'src/services';

import { Button, CardHr } from 'src/components/utils';

import { Song } from 'src/context/databaseContext';

type MobileCardProps = {
  id: number;
  title: string;
  description: string;
  handleUserUpdate(): void;
  isSong?: boolean;
  composer?: string;
  arranger?: string;
  isSet?: boolean;
  songs?: Song[];
  allSongs?: Song[];
};

type DeleteFunc = (
  table: typeof SONGS[0] | typeof SETS[0] | typeof SONGS_SETS_LINK,
  itemId: number,
  linkId?: number
) => Promise<void>;

type SubmitFunc = (
  e: React.BaseSyntheticEvent,
  linkId: number
) => Promise<void>;

const MobileCard = ({
  id,
  title,
  description,
  handleUserUpdate,
  isSong,
  composer,
  arranger,
  isSet,
  songs,
  allSongs
}: MobileCardProps) => {
  const handleDelete: DeleteFunc = async (table, itemId, linkId) => {
    await DeleteService.deleteSomething(table, itemId, linkId);

    handleUserUpdate();
  };

  const handleSubmit: SubmitFunc = async (e, secondId) => {
    e.preventDefault();
    const { song, set } = e.target;

    if (song) await PostService.updateSongSet(Number(song.value), secondId);
    if (set) await PostService.updateSetGig(Number(set.value), secondId);

    handleUserUpdate();
  };

  const renderSongInfo = (
    <p className="comp-arr">
      <span className="composer">Composer: {composer || 'N/A'} | </span>
      <span className="arranger">Arranger: {arranger || 'N/A'}</span>
    </p>
  );

  const renderSongTitles = songs && songs.map((song) => (
    <div key={song.id} className="mobile-song-title">
      <p className="song-title">{song.song_title}</p>
      <Button onClick={() => handleDelete(SONGS_SETS_LINK, song.id, id)}>
        Remove?
      </Button>
    </div>
  ));

  const renderAddSong = (
    <form className="add-song" onSubmit={(e) => handleSubmit(e, id)}>
      <select id="song">
        {allSongs && allSongs.map((song) => (
          <option key={song.id} value={song.id}>
            {song.song_title}
          </option>
        ))}
      </select>
      <Button type="submit">Add Song</Button>
    </form>
  );

  const dbTable = isSong ? SONGS[0] : SETS[0];

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
        {isSet && renderAddSong}
        <h5>Description:</h5>
        <p>{description}</p>
      </article>
    </li>
  );
};

export default MobileCard;
