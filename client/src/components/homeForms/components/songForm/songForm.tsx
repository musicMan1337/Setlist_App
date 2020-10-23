import React, { useState, useContext, useLayoutEffect } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { SONGS } from 'src/constants/routes.constants';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

import useFormState, { SongField } from 'src/hooks/useFormState';

const SongForm = () => {
  const [activeSubmit, setActiveSubmit] = useState(false);
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, setFormFields, changeHandler } = useFormState({
    song_title: '',
    composer: '',
    arranger: '',
    description: ''
  });

  useLayoutEffect(() => {
    const validForm = () => {
      const { song_title } = formFields;

      if (song_title)
        if (song_title.length >= 3 && song_title.length <= 50)
          return setActiveSubmit(true);

      setActiveSubmit(false);
    };

    validForm();
  }, [formFields]);

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
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

  const fields: SongField[] = [
    'song_title',
    'composer',
    'arranger',
    'description'
  ];

  const fieldDisplayText: Record<SongField, string> = {
    song_title: 'Title (required)',
    composer: 'Composer',
    arranger: 'Arranger',
    description: 'Description'
  };

  const renderFields = fields.map((field) => (
    <label key={field} className="form-label" htmlFor="field">
      {fieldDisplayText[field].split(' ')[0]}:
      <input
        type="text"
        id={field}
        placeholder={fieldDisplayText[field]}
        value={formFields[field]}
        onChange={changeHandler(field)}
      />
    </label>
  ));

  return (
    <div className="home-form-container">
      <h2>New Song</h2>
      <form className="home-form" onSubmit={handleSubmit}>
        {renderFields}
        <Button type="submit" disabled={!activeSubmit}>
          Create!
        </Button>
      </form>
    </div>
  );
};

export default SongForm;
