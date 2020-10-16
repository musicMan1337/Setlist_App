import React, { useContext } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { SETS } from 'src/constants/routes.constants';
import useFormState from 'src/hooks/useFormState';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

const SetForm = () => {
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, setFormFields, changeHandler } = useFormState({
    set_name: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await PostService.createSomething(SETS[0], formFields);

      setFormFields({
        set_name: '',
        description: ''
      });

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const renderFields = ['Name', 'Description'].map((field) => (
    <label key={field} className="form-label" htmlFor="field">
      {field}:
      <input
        type="text"
        id={field}
        placeholder={field}
        value={formFields[field]}
        onChange={changeHandler(
          field === 'Name' ? 'set_name' : field.toLowerCase()
        )}
      />
    </label>
  ));

  return (
    <div className="home-form-container">
      <h2>New Set</h2>
      <form className="home-form" onSubmit={(e) => handleSubmit(e)}>
        {renderFields}
        <Button type="submit">Create!</Button>
      </form>
    </div>
  );
};

export default SetForm;
