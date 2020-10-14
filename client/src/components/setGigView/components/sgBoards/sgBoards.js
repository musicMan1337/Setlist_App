import React from 'react';
import PropTypes from 'prop-types';

import './sgBoards.scss';

import { SETS, SONGS_SETS_LINK } from 'src/constants/routes.constants';

import { DeleteService } from 'src/services';

import { Button } from 'src/components/utils';

const SGBoards = ({ boardTable, buttonText, handleUserUpdate }) => {
  const handleDelete = async (table, id, linkId = null) => {
    try {
      await DeleteService.deleteSomething(table, id, linkId);

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const renderBoards = boardTable.map((item) => {
    if (buttonText.includes('Set')) {
      const set = item;
      return (
        <div key={set.id} className="set-gig-board">
          <header>{set.set_name}</header>
          <ul className="board">
            {set.songs.map((song) => (
              <div key={song.id}>
                <li>
                  <h3>{song.song_title}</h3>
                </li>
                <Button
                  onClick={() => handleDelete(SONGS_SETS_LINK, song.id, set.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => handleDelete(SETS[0], set.id)}>
              Delete Set?
            </Button>
          </ul>
        </div>
      );
    }
    return null;
    // TODO - Feature: Gigs
    // const gig = item;

    // manual table-join
    //   const links = setGigTable.filter(
    //     (ids) => ids.gig_id === gig.gig_id && ids.set_id
    //   );
    //   const setTitles = listTable.filter(
    //     (set) => links.includes(set.set_id) && set.set_name
    //   );
    //   return (
    //     <div className="set-gig-board">
    //       <header>{gig.gig_name}</header>
    //       <ul className="board">
    //         {setTitles.map((title) => (
    //           <li key={title}>
    //             <h3>{title}</h3>
    //           </li>
    //         ))}
    //         <Button>Delete?</Button>
    //       </ul>
    //     </div>
    //   );
  });

  return (
    <div className="set-gig-boards-container">
      <div className="set-gig-boards">{renderBoards}</div>
    </div>
  );
};

export default SGBoards;

SGBoards.propTypes = {
  boardTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.oneOf(['Add to Set', 'Add to Gig']).isRequired,
  handleUserUpdate: PropTypes.func.isRequired
};
