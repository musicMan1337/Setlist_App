import React from 'react';
import PropTypes from 'prop-types';

import './sgList.scss';

import { PostService } from 'src/services';

import { CardHr, Button } from 'src/components/utils';

const SGList = ({ listTable, boardTable, buttonText, handleUserUpdate }) => {
  const handleSubmit = async (e, firstId) => {
    e.preventDefault();
    const { sets, gigs } = e.target;

    if (sets) await PostService.updateSongSet(firstId, Number(sets.value));
    if (gigs) await PostService.updateSetGig(firstId, Number(gigs.value));

    handleUserUpdate();
  };

  const renderListItems = listTable.map((item) => {
    // if (buttonText.includes('Set')) {
    const song = item;
    const sets = boardTable;

    return (
      <li key={song.id} className="set-gig-card">
        <h3>{song.song_title}</h3>
        <CardHr />
        <article className="expanded-card">
          <p className="composer">Composer: {song.composer || 'N/A'}</p>
          <p className="arranger">Arranger: {song.arranger || 'N/A'}</p>
          <h5>Description:</h5>
          <p>{song.description}</p>
          <form onSubmit={(e) => handleSubmit(e, song.id)}>
            <select id="sets">
              {sets.map((set) => {
                // TODO - breakout logic into separate file
                const checkSongs = set.songs.find(
                  (check) => check.song_title === song.song_title
                );

                if (checkSongs) return null;

                return (
                  <option key={set.id} value={set.id}>
                    {set.set_name}
                  </option>
                );
              })}
            </select>
            <Button type="submit">{buttonText}</Button>
          </form>
        </article>
      </li>
    );
    // }

    // TODO - Feature: Gigs
    // if (buttonText.includes('Gig')) {
    // const set = item;
    // }
  });

  return <ul className="set-gig-list">{renderListItems}</ul>;
};

export default SGList;

SGList.propTypes = {
  listTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  boardTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.oneOf(['Add to Set', 'Add to Gig']).isRequired,
  handleUserUpdate: PropTypes.func.isRequired
};
