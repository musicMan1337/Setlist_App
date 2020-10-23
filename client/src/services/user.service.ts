import config from 'src/config';
import { LOGIN, REGISTER } from 'src/constants/routes.constants';

const { API_ENDPOINT } = config;

type loginObject = { user_name: string; password: string };

const headers = {
  'content-type': 'application/json'
};

const UserService = {
  async authLogin(authToken: string) {
    const user = await fetch(API_ENDPOINT + LOGIN, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
    return user.json();
  },

  async userLogin({ user_name, password }: loginObject) {
    try {
      const res = await fetch(API_ENDPOINT + LOGIN, {
        method: 'POST',
        headers,
        body: JSON.stringify({ user_name, password })
      });

      if (!res.ok) throw Error;

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async userRegistration({ user_name, password }: loginObject) {
    const res = await fetch(API_ENDPOINT + REGISTER, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user_name, password })
    });

    return !res.ok ? res.json().then(Promise.reject) : res.json();
  }
};

export default UserService;
