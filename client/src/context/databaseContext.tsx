import React, { createContext, FC, useEffect, useState } from 'react';

import config from 'src/config';
import { SONGS, SETS } from 'src/constants/routes.constants';

import TokenService from 'src/services/token.service';

const initialContext: Context.createContextProps = {
  songs: [],
  sets: [],
  handleUserUpdate: () => null
};

export const DatabaseContext = createContext(initialContext);

const DatabaseContextProvider: Types.DatabaseContextProviderProps = ({
  userName,
  children
}) => {
  const [songs, setSongs] = useState<Context.Song[]>([]);
  const [sets, setSets] = useState<Context.Set[]>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      if (!userName) {
        setSongs([]);
        setSets([]);
        return;
      }

      const { API_ENDPOINT } = config;
      const fetchEndpoints = [API_ENDPOINT + SONGS[0], API_ENDPOINT + SETS[0]];
      const authToken = TokenService.getAuthToken();

      const [allSongs, allSets] = await Promise.all(
        fetchEndpoints.map(async (endpoint) => {
          const data = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${authToken}`
            }
          });
          const json = await data.json();

          return json;
        })
      );

      setSongs(allSongs);
      setSets(allSets);
    };

    if (userName.length >= 3) fetcher();
  }, [userName, update]);

  const handleUserUpdate = () => setUpdate(!update);

  const value = { songs, sets, handleUserUpdate };

  return (
    <DatabaseContext.Provider value={value}>
      {children && children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContextProvider;
