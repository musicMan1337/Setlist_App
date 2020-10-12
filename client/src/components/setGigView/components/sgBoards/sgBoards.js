import React from 'react';
import PropTypes from 'prop-types';

import './sgBoards.scss';

import { Board } from 'src/components/utils/lists';
import { Button } from 'src/components/utils/tools';

const SGBoards = ({ boardTable, buttonText }) => {
  const renderBoards = boardTable.map((item) => {
    if (buttonText.includes('Set')) {
      const set = item;
      return (
        <div className="set-gig-board">
          <header>{set.set_name}</header>
          <Board>
            {set.songs.map((songTitle) => (
              <li>
                <h3>{songTitle}</h3>
              </li>
            ))}
            <Button>Delete Set?</Button>
          </Board>
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
  boardTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.oneOf(['Add to Set', 'Add to Gig']).isRequired
};
