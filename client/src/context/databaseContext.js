import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import config from 'src/config';
import { SONGS, SETS } from 'src/constants/routes.constants';

export const DatabaseContext = createContext();

const DatabaseContextProvider = ({ userId, ...props }) => {
  const [songs, setSongs] = useState([]);
  const [sets, setSets] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      if (userId === 0) return;
      const { API_ENDPOINT } = config;
      const fetchEndpoints = [API_ENDPOINT + SONGS[0], API_ENDPOINT + SETS[0]];

      const [allSongs, allSets] = await Promise.all(
        fetchEndpoints.map(async (endpoint) => {
          const data = await fetch(endpoint);
          const json = await data.json();
          return json;
        })
      );

      setSongs(allSongs);
      setSets(allSets);
    };

    fetcher();
  }, [userId, update]);

  const handleUserUpdate = () => setUpdate(!update);

  const value = { songs, sets, handleUserUpdate };

  return (
    <DatabaseContext.Provider value={value}>
      {props.children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContextProvider;

DatabaseContextProvider.propTypes = {
  userId: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};
