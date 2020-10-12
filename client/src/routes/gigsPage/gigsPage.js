import React from 'react';

import './gigsPage.scss';
import { GIGS } from 'src/constants/routes.constants';

import { MobileView } from 'src/components';
import { CardHr, Button } from 'src/components/utils/tools';
import {
  SetGigContainer
} from 'src/components/utils/containers';

import {
  SetGigList,
  Board
} from 'src/components/utils/lists';


const GigsPage = () => {
  // TODO - Feature: useState "expanded-card" (mobile) toggle

  // TODO - Component "set-gig-card"
  // TODO - Component "set-gig-board"
  // TODO - Component "choose-set"
  // TODO - Component "set-gig-boards"

  // TODO - map() render "set-gig-card"
  // TODO - map() render "choose-set"
  // TODO - map() render "set-gig-board"

  // TODO - useState "choose-set" toggle

  return (
    <>
      <MobileView page={GIGS} />

      <SetGigContainer>
        <SetGigList>
          <li className="set-gig-card">
            <h3>Gig Title</h3>
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
            <h3>Gig Title</h3>
            <CardHr />
          </li>
        </SetGigList>

        <div className="set-gig-boards-container">
          <select name="choose-gig" id="choose-gig" className="choose-set-gig">
            <option value="gig_id">Gig Name1</option>
            <option value="gig_id">Gig Name2</option>
          </select>

          <div className="set-gig-boards">
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
          </div>
        </div>
      </SetGigContainer>
    </>
  );
};

export default GigsPage;
