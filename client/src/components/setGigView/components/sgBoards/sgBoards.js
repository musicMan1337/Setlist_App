import React from 'react';
import PropTypes from 'prop-types';

import './sgBoards.scss';

import { Board } from 'src/components/utils/lists';
import { Button } from 'src/components/utils/tools';

const SGBoards = ({
  listTable,
  boardTable,
  songSetTable,
  setGigTable,
  buttonText
}) => {
  const renderBoards = boardTable.map((item) => {
    if (buttonText.includes('Set')) {
      const set = item;

      console.log('table', songSetTable);

      // manual table-join
      const links = songSetTable.filter(
        (ids) => ids.set_id === set.set_id && ids.song_id
      );
      const songTitles = listTable.filter(
        (song) => links.includes(song.song_id) && song.song_title
      );

      return (
        <div className="set-gig-board">
          <header>{set.set_name}</header>
          <Board>
            {/* TODO - implement linkage table and map titles */}
            <li>
              <h3>Song Title</h3>
            </li>
            <li>
              <h3>Song Title</h3>
            </li>
            <Button>Delete?</Button>
          </Board>
        </div>
      );
    }
    return null
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
    //       <Board>
    //         {setTitles.map((title) => (
    //           <li key={title}>
    //             <h3>{title}</h3>
    //           </li>
    //         ))}
    //         <Button>Delete?</Button>
    //       </Board>
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
  listTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  boardTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  songSetTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGigTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.oneOf(['Add to Set', 'Add to Gig']).isRequired
};
