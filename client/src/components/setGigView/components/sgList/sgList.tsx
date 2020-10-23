import React from 'react';

import './sgList.scss';

import { PostService } from 'src/services';

import { CardHr, Button } from 'src/components/utils';

import { SGComponentsProps } from 'src/context/databaseContext';

type SubmitFunc = (
  e: React.BaseSyntheticEvent,
  firstId: number
) => Promise<void>;

const SGList = ({
  songsList,
  setsList,
  setsBoard,
  gigsBoard,
  buttonText,
  handleUserUpdate
}: SGComponentsProps) => {
  const handleSubmit: SubmitFunc = async (e, firstId) => {
    e.preventDefault();
    const { sets, gigs } = e.target;

    if (sets) await PostService.updateSongSet(firstId, Number(sets.value));
    if (gigs) await PostService.updateSetGig(firstId, Number(gigs.value));

    handleUserUpdate();
  };

  const renderListItems = songsList
    ? songsList.map((song) => (
        <li key={song.id} className="set-gig-card">
          <h3>{song.song_title}</h3>
          <CardHr />
          <article className="expanded-card">
            <p className="composer">Composer: {song.composer || 'N/A'}</p>
            <p className="arranger">Arranger: {song.arranger || 'N/A'}</p>
            <h5>Description:</h5>
            <p>{song.description}</p>
            <form onSubmit={(e) => handleSubmit(e, song.id)}>
              <select id="sets">
                {setsBoard &&
                  setsBoard.map((set) => {
                    // TODO - breakout logic into separate file
                    const checkSongs = set.songs.find(
                      (check) => check.song_title === song.song_title
                    );

                    if (checkSongs) return null;

                    return (
                      <option key={set.id} value={set.id}>
                        {set.set_name}
                      </option>
                    );
                  })}
              </select>
              <Button type="submit">{buttonText}</Button>
            </form>
          </article>
        </li>
      ))
    : // TODO - Feature: Gigs
      setsList &&
      setsList.map((set) => (
        <li key={set.id} className="set-gig-card">
          <h3>{set.set_name}</h3>
          <CardHr />
          <article className="expanded-card">
            <h5>Description:</h5>
            <p>{set.description}</p>
            <form onSubmit={(e) => handleSubmit(e, set.id)}>
              <select id="sets">
                {gigsBoard &&
                  gigsBoard.map((gig) => {
                    // TODO - breakout logic into separate file
                    const checkSets = gig.sets.find(
                      (check) => check.set_name === set.set_name
                    );

                    if (checkSets) return null;

                    return (
                      <option key={gig.id} value={gig.id}>
                        {gig.venue}
                      </option>
                    );
                  })}
              </select>
              <Button type="submit">{buttonText}</Button>
            </form>
          </article>
        </li>
      ));

  return <ul className="set-gig-list">{renderListItems}</ul>;
};

export default SGList;
