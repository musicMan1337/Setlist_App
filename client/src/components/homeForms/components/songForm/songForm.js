import React, { useContext } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { SONGS } from 'src/constants/routes.constants';

import useFormState from 'src/hooks/useFormState';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

const SongForm = () => {
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, changeHandler } = useFormState({
    song_title: '',
    composer: '',
    arranger: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await PostService.createSomething(SONGS[0], formFields);

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const renderFields = ['Title', 'Composer', 'Arranger', 'Description'].map(
    (field) => (
      <label key={field} className="form-label" htmlFor="field">
        {field}:
        <input
          type="text"
          id={field}
          placeholder={field}
          value={formFields[field.toLowerCase()]}
          onChange={changeHandler(
            field === 'Title' ? 'song_title' : field.toLowerCase()
          )}
        />
      </label>
    )
  );

  return (
    <div className="home-form-container">
      <h2>Songs</h2>
      <form className="home-form" onSubmit={(e) => handleSubmit(e)}>
        {renderFields}
        <Button type="submit">Create!</Button>
      </form>
    </div>
  );
};

export default SongForm;
