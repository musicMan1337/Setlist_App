import React, { useState, useContext, useLayoutEffect } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { GIGS } from 'src/constants/routes.constants';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

import useFormState, { GigField } from 'src/hooks/useFormState';

const GigForm = () => {
  const [activeSubmit, setActiveSubmit] = useState(false);
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, setFormFields, changeHandler } = useFormState({
    venue: '',
    gig_date: '',
    start_time: '',
    end_time: ''
  });

  useLayoutEffect(() => {
    const validForm = () => {
      const { venue } = formFields;

      if (venue)
        if (venue.length >= 3 && venue.length <= 50)
          return setActiveSubmit(true);

      setActiveSubmit(false);
    };

    validForm();
  }, [formFields]);

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    try {
      await PostService.createSomething(GIGS[0], formFields);

      setFormFields({
        venue: '',
        gig_date: '',
        start_time: '',
        end_time: ''
      });

      handleUserUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const fields: GigField[] = ['venue', 'gig_date', 'start_time', 'end_time'];

  const fieldDisplayText: Record<GigField, string> = {
    venue: 'Venue (required)',
    gig_date: 'Gig Date',
    start_time: 'Start Time',
    end_time: 'End Time'
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
      <h2>Gigs</h2>
      <form className="home-form" onSubmit={handleSubmit}>
        {renderFields}
        <Button type="submit" disabled={!activeSubmit}>
          Create!
        </Button>
      </form>
    </div>
  );
};

export default GigForm;
