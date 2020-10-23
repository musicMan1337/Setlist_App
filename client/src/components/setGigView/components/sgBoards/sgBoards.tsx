import React from 'react';

import './sgBoards.scss';

import { SETS, GIGS, SONGS_SETS_LINK } from 'src/constants/routes.constants';

import { DeleteService } from 'src/services';

import { Button } from 'src/components/utils';

import { SGComponentsProps } from 'src/context/databaseContext';

type DeleteFunc = (
  table: typeof SETS[0] | typeof GIGS[0] | typeof SONGS_SETS_LINK,
  itemId: number,
  linkId?: number
) => Promise<void>;

const SGBoards = ({
  setsBoard,
  gigsBoard,
  handleUserUpdate
}: SGComponentsProps) => {
  const handleDelete: DeleteFunc = async (table, id, linkId) => {
    try {
      await DeleteService.deleteSomething(table, id, linkId);

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const renderBoards = setsBoard
    ? setsBoard.map((set) => (
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
      ))
    : // TODO - Feature: Gigs
      gigsBoard &&
      gigsBoard.map((gig) => (
        <div key={gig.id} className="set-gig-board">
          <header>{gig.venue}</header>
          <ul className="board">
            {gig.sets.map((set) => (
              <div key={set.id}>
                <li>
                  <h3>{set.set_name}</h3>
                </li>
                <Button
                  onClick={() => handleDelete(SONGS_SETS_LINK, set.id, gig.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => handleDelete(GIGS[0], gig.id)}>
              Delete Set?
            </Button>
          </ul>
        </div>
      ));

  return (
    <div className="set-gig-boards-container">
      <div className="set-gig-boards">{renderBoards}</div>
    </div>
  );
};

export default SGBoards;
