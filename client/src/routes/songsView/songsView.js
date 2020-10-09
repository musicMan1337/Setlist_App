import React from 'react';

import './songsView.scss';

import {
  MainContainer,
  SongSetGigMobileContainer
} from 'src/components/utils/containers';

import { SongSetGigMobileList } from 'src/components/utils/lists';
import { CardHr } from 'src/components/utils/tools';

const SongsView = () => {

  // TODO - Component "modile-card"
  // TODO - Component "song-view-card"

  // TODO - map() render "mobile-card"
  // TODO - map() render "song-card"

  // TODO - useState "expanded-card" toggle

  return (
    <MainContainer>
      <SongSetGigMobileContainer>
        <SongSetGigMobileList>
          <li className="modile-card">
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
            </article>
          </li>

          <li className="modile-card">
            <h3>Song Title</h3>
            <CardHr />
          </li>
        </SongSetGigMobileList>
      </SongSetGigMobileContainer>

      <div className="song-container">
        <div className="song-card">
          <h3>Song Title</h3>
          <CardHr />
          <article className="expanded-card">
            <h5>Description:</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </article>
        </div>

        <div className="song-card">
          <h3>Song Title</h3>
          <CardHr />
          <article className="expanded-card">
            <h5>Description:</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </article>
        </div>

      </div>
    </MainContainer>
  );
};

export default SongsView;
