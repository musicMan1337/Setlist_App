import React, { createContext, FC, useEffect, useState } from 'react';

import config from 'src/config';
import { SONGS, SETS } from 'src/constants/routes.constants';

import TokenService from 'src/services/token.service';

type DatabaseContextProviderProps = {
  userName: string;
};

export type Song = {
  id: number;
  song_title: string;
  composer: string;
  arranger: string;
  description: string;
};

export type Set = {
  id: number;
  set_name: string;
  description: string;
  songs: Song[]
};

export type Gig = {
  id: number;
  venue: string;
  gig_date: string;
  start_time: string;
  end_time: string;
  sets: Set[];
};

export type SGComponentsProps = {
  songsList?: Song[];
  setsList?: Set[];
  setsBoard?: Set[];
  gigsBoard?: Gig[];
  buttonText: 'Add to Set' | 'Add to Gig';
  handleUserUpdate(): void;
};

type createContextProps = {
  songs: Song[];
  sets: Set[];
  handleUserUpdate(): void;
};

const initialContext: createContextProps = {
  songs: [],
  sets: [],
  handleUserUpdate: () => null
};

export const DatabaseContext = createContext(initialContext);

const DatabaseContextProvider: FC<DatabaseContextProviderProps> = ({
  userName,
  ...props
}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [sets, setSets] = useState<Set[]>([]);
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
      {props.children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContextProvider;
