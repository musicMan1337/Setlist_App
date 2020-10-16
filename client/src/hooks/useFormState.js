import { useState } from 'react'

function useFormState(initialValues) {
  const [formFields, setFormFields] = useState(initialValues);

  const changeHandler = (key) => (e) => {
    const { value } = e.target;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  return { formFields, setFormFields, changeHandler };
}

export default useFormState
