import React from 'react';
import PropTypes from 'prop-types';

import { SetGigList } from 'src/components/utils/lists';
import { CardHr, Button } from 'src/components/utils/tools';
import PostService from 'src/services/post.service';

const SGList = ({ listTable, boardTable, buttonText, handleUserUpdate }) => {
  const handleSubmit = (e, firstId) => {
    e.preventDefault();

    const { sets, gigs } = e.target;
    console.log(firstId, Number(sets.value));

    if (sets) PostService.updateSongSet(firstId, Number(sets.value));
    if (gigs) PostService.updateSetGig(firstId, Number(gigs.value));

    handleUserUpdate();
  };

  const renderListItems = listTable.map((item) => {
    // if (buttonText.includes('Set')) {
    const song = item;
    const sets = boardTable;

    return (
      <li key={song.song_title} className="set-gig-card">
        <h3>{song.song_title}</h3>
        <CardHr />
        <article className="expanded-card">
          <p className="composer">Composer: {song.composer || 'N/A'}</p>
          <p className="arranger">Arranger: {song.arranger || 'N/A'}</p>
          <h5>Description:</h5>
          <p>{song.description}</p>
          <form onSubmit={(e) => handleSubmit(e, song.id)}>
            <select id="sets">
              {sets.map((set) => (
                <option value={set.id}>{set.set_name}</option>
              ))}
            </select>
            <Button type="submit">{buttonText}</Button>
          </form>
        </article>
      </li>
    );
    // }

    // TODO - Feature: Gigs
    // const set = item;
    // return (
    //   <li key={set.set_name} className="set-gig-card">
    //     <h3>{set.set_name}</h3>
    //     <CardHr />
    //     <article className="expanded-card">
    //       <h5>Description:</h5>
    //       <p>{set.description}</p>
    //       <Button>{buttonText}</Button>
    //     </article>
    //   </li>
    // );
  });

  return (
    <SetGigList>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Button>{buttonText}</Button>
      </form>
      {renderListItems}
    </SetGigList>
  );
};

export default SGList;

SGList.propTypes = {
  listTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  boardTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.oneOf(['Add to Set', 'Add to Gig']).isRequired,
  handleUserUpdate: PropTypes.func.isRequired
};
