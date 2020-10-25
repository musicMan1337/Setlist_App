import { useState } from 'react';

type FormStateValues = Partial<{
  // LoginForm
  user_name: string;
  password: string;
  submitType: 'Login' | 'Register' | '';
  invalidCreds: boolean;
  // HomeForms
  song_title: string;
  composer: string;
  arranger: string;
  description: string;
  set_name: string;
  venue: string;
  gig_date: string;
  start_time: string;
  end_time: string;
}>;

export type SubmitTypes = 'Login' | 'Register';
export type LoginFields = 'user_name' | 'password';
export type SongFields = 'song_title' | 'composer' | 'arranger' | 'description';
export type SetFields = 'set_name' | 'description';
export type GigFields = 'venue' | 'gig_date' | 'start_time' | 'end_time';

type FieldKeys = Partial<
  'submitType' | LoginFields | SongFields | SetFields | GigFields
>;

function useFormState(initialValues: FormStateValues) {
  const [formFields, setFormFields] = useState(initialValues);

  const changeHandler = (key: FieldKeys) => (e: React.BaseSyntheticEvent) => {
    const { value } = e.target;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  return { formFields, setFormFields, changeHandler };
}

export default useFormState;
