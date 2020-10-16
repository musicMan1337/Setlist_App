import React, { useContext } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { SONGS } from 'src/constants/routes.constants';

import useFormState from 'src/hooks/useFormState';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

const SongForm = () => {
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, setFormFields, changeHandler } = useFormState({
    song_title: '',
    composer: '',
    arranger: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await PostService.createSomething(SONGS[0], formFields);

      setFormFields({
        song_title: '',
        composer: '',
        arranger: '',
        description: ''
      });

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const renderFields = [
    'song_title',
    'Composer',
    'Arranger',
    'Description'
  ].map((field) => (
    <label key={field} className="form-label" htmlFor="field">
      {field === 'song_title' ? 'Title' : field}:
      <input
        type="text"
        id={field}
        placeholder={field === 'song_title' ? 'Title' : field}
        value={formFields[field.toLowerCase()]}
        onChange={changeHandler(field.toLowerCase())}
      />
    </label>
  ));

  return (
    <div className="home-form-container">
      <h2>New Song</h2>
      <form className="home-form" onSubmit={(e) => handleSubmit(e)}>
        {renderFields}
        <Button type="submit">Create!</Button>
      </form>
    </div>
  );
};

export default SongForm;
