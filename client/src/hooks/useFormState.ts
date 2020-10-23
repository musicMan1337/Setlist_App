import { useState } from 'react';

interface FormStateValues {
  // LoginForm
  user_name?: string;
  password?: string;
  submitType?: 'Login' | 'Register';
  invalidCreds?: boolean;
  // HomeForms
  song_title?: string;
  composer?: string;
  arranger?: string;
  description?: string;
  set_name?: string;
  venue?: string;
  gig_date?: string;
  start_time?: string;
  end_time?: string;
}

export type SubmitTypes = 'Login' | 'Register';
export type LoginField = 'user_name' | 'password';
export type SongField = 'song_title' | 'composer' | 'arranger' | 'description';
export type SetField = 'set_name' | 'description';
export type GigField = 'venue' | 'gig_date' | 'start_time' | 'end_time';

type FieldKeys = Partial<
  | Record<LoginField, string>
  | Record<SongField, string>
  | Record<SetField, string>
  | Record<GigField, string>
>;

function useFormState(initialValues: FormStateValues) {
  const [formFields, setFormFields] = useState(initialValues);

  const changeHandler = (key: keyof FormStateValues) => (e: React.BaseSyntheticEvent) => {
    const { value } = e.target;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  return { formFields, setFormFields, changeHandler };
}

export default useFormState;
