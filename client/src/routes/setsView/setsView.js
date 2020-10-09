import React from 'react';

import './setsView.scss';

import {
  MainContainer,
  SongSetGigMobileContainer,
  SetGigContainer,
  SetGigBoardsContainer,
  SetGigBoards
} from 'src/components/utils/containers';

import {
  SongSetGigMobileList,
  SetGigList,
  Board
} from 'src/components/utils/lists';

import { CardHr, Button } from 'src/components/utils/tools';

const SetsView = () => {

  // TODO - Component "modile-card"
  // TODO - Component "set-gig-card"
  // TODO - Component "set-gig-board"
  // TODO - Component "choose-set"
  // TODO - Component "set-gig-boards"

  // TODO - map() render "modile-card"
  // TODO - map() render "set-gig-card"
  // TODO - map() render "choose-set"
  // TODO - map() render "set-gig-board"

  // TODO - useState "expanded-card" toggle
  // TODO - useState "choose-set" toggle

  return (
    <MainContainer>
      <SongSetGigMobileContainer>
        <SongSetGigMobileList>
          <li className="modile-card">
            <h3>Set Title</h3>
            <CardHr />
            <article className="expanded-card">
              <h5>Some Display Content:</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
            </article>
          </li>

          <li className="modile-card">
            <h3>Set Title</h3>
            <CardHr />
          </li>
        </SongSetGigMobileList>
      </SongSetGigMobileContainer>

      <SetGigContainer>
        <SetGigList>
          <li className="set-gig-card">
            <h3>Song Title</h3>
            <CardHr />
            <article className="expanded-card">
              <h5>Description:</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
              <Button>Add to Set</Button>
            </article>
          </li>

          <li className="set-gig-card">
            <h3>Song Title</h3>
            <CardHr />
          </li>
        </SetGigList>

        <SetGigBoardsContainer>
          <select name="choose-set" id="choose-set" className="choose-set-gig">
            <option value="set_id">Set Name1</option>
            <option value="set_id">Set Name2</option>
          </select>

          <SetGigBoards>
            <div className="set-gig-board">
              <header>Set Name</header>
              <Board>
                <li>
                  <h3>Song Title</h3>
                  <CardHr />
                </li>
                <li>
                  <h3>Song Title</h3>
                  <CardHr />
                </li>
              </Board>
            </div>

            <div className="set-gig-board">
              <header>Set Name</header>
              <Board>
                <li>
                  <h3>Song Title</h3>
                  <CardHr />
                </li>
                <li>
                  <h3>Song Title</h3>
                  <CardHr />
                </li>
              </Board>
            </div>

          </SetGigBoards>
        </SetGigBoardsContainer>
      </SetGigContainer>
    </MainContainer>
  );
};

export default SetsView;
