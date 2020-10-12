import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import config from 'src/config';
import { SONGS, SETS, SONG_SET_LINK } from 'src/constants/routes.constants';

export const DatabaseContext = createContext();

const DatabaseContextProvider = (props) => {
  const [songs, setSongs] = useState([]);
  const [sets, setSets] = useState([]);
  const [songSetLinkages, setSongSetLinkages] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const { API_ENDPOINT } = config;
      const fetchEndpoints = [
        API_ENDPOINT + SONGS[0],
        API_ENDPOINT + SETS[0]
        // API_ENDPOINT + SONG_SET_LINK[0]
      ];

      const [allSongs, allSets, linkageTable] = await Promise.all(
        fetchEndpoints.map(async (endpoint) => {
          const data = await fetch(endpoint);
          const json = await data.json();
          console.log(json);
          return json;
        })
      );

      setSongs(allSongs);
      setSets(allSets);
      setSongSetLinkages(linkageTable);
    };

    fetcher();
  }, []);

  return (
    <DatabaseContext.Provider value={{ songs, sets, songSetLinkages }}>
      {props.children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContextProvider;

DatabaseContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
