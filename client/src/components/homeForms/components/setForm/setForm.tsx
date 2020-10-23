import React, { useState, useContext, useLayoutEffect } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { SETS } from 'src/constants/routes.constants';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

import useFormState, { SetField } from 'src/hooks/useFormState';

const SetForm = () => {
  const [activeSubmit, setActiveSubmit] = useState(false);
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, setFormFields, changeHandler } = useFormState({
    set_name: '',
    description: ''
  });

  useLayoutEffect(() => {
    const validForm = () => {
      const { set_name } = formFields;

      if (set_name)
        if (set_name.length >= 3 && set_name.length <= 50)
          return setActiveSubmit(true);

      setActiveSubmit(false);
    };

    validForm();
  }, [formFields]);

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
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

  const fields: SetField[] = ['set_name', 'description'];

  const fieldDisplayText: Record<SetField, string> = {
    set_name: 'Name (required)',
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
      <h2>New Set</h2>
      <form className="home-form" onSubmit={handleSubmit}>
        {renderFields}
        <Button type="submit" disabled={!activeSubmit}>
          Create!
        </Button>
      </form>
    </div>
  );
};

export default SetForm;
