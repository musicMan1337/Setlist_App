import React, { useLayoutEffect, useState } from 'react';

import './loginForm.scss';

import { UserService, TokenService } from 'src/services';

import { Button } from 'src/components/utils';

import useFormState, { SubmitTypes, LoginFields } from 'src/hooks/useFormState';

const LoginForm = ({ loginSuccess }: Types.LoginFormProps) => {
  const [activeSubmit, setActiveSubmit] = useState(false);

  const { formFields, setFormFields, changeHandler } = useFormState({
    user_name: '',
    password: '',
    submitType: '',
    invalidCreds: false
  });

  useLayoutEffect(() => {
    const validForm = () => {
      let { user_name, password } = formFields;

      if (user_name && password)
        if (user_name.length >= 3 && user_name.length <= 50)
          if (password.length >= 3 && password.length <= 150)
            return setActiveSubmit(true);

      setActiveSubmit(false);
    };

    validForm();
  }, [formFields]);

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {console.log(e.target.submit);

      let data;
      if (formFields.user_name && formFields.password) {
        const { user_name, password } = formFields;
        if (formFields.submitType === 'Login') {
          data = await UserService.userLogin({ user_name, password });
        } else {
          data = await UserService.userRegistration({ user_name, password });
        }
      }

      if (!data) return setFormFields({ ...formFields, invalidCreds: true });

      const { authToken, user_name } = data;

      TokenService.saveAuthToken(authToken);
      loginSuccess(user_name);
    } catch (error) {
      setFormFields({ ...formFields, invalidCreds: true });
    }
  };

  const fields: LoginFields[] = ['user_name', 'password'];

  const fieldDisplayText: Record<LoginFields, string> = {
    user_name: 'Username:',
    password: 'Password:'
  };

  const inputType: Record<LoginFields, string> = {
    user_name: 'text',
    password: 'password'
  };

  const inputFields = fields.map((field) => (
    <label key={field} className="form-label" htmlFor="user_name">
      {fieldDisplayText[field]}
      <input
        type={inputType[field]}
        id={field}
        placeholder={fieldDisplayText[field]}
        value={formFields[field]}
        onChange={changeHandler(field)}
      />
    </label>
  ));

  const buttons: SubmitTypes[] = ['Login', 'Register'];

  const submitButtons = buttons.map((subType) => (
    <Button
      key={subType}
      type="submit"
      value={subType}
      onClick={changeHandler('submitType')}
      disabled={!activeSubmit}
    >
      {subType}
    </Button>
  ));

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {inputFields}
      <p>{formFields.invalidCreds && 'Invalid Login'}</p>
      {submitButtons}
    </form>
  );
};

export default LoginForm;
