import React, { useContext } from 'react';

import { DatabaseContext } from 'src/context/databaseContext';
import { GIGS } from 'src/constants/routes.constants';
import useFormState from 'src/hooks/useFormState';

import { PostService } from 'src/services';

import { Button } from 'src/components/utils/';

const GigForm = () => {
  const { handleUserUpdate } = useContext(DatabaseContext);

  const { formFields, setFormFields, changeHandler } = useFormState({
    venue: '',
    gig_date: '',
    start_time: '',
    end_time: ''
  });

  const handleSubmit = async (e) => {
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

  const renderFields = ['Venue', 'Gig Date', 'Start Time', 'End Time'].map(
    (field) => (
      <label key={field} className="form-label" htmlFor="field">
        {field}:
        <input
          type="text"
          id={field}
          placeholder={field}
          value={formFields[field]}
          onChange={changeHandler(field.toLowerCase().join('_'))}
        />
      </label>
    )
  );

  return (
    <div className="home-form-container">
      <h2>Gigs</h2>
      <form className="home-form" onSubmit={(e) => handleSubmit(e)}>
        {renderFields}
        <Button type="submit">Create!</Button>
      </form>
    </div>
  );
};

export default GigForm;
