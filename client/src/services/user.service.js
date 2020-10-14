import config from 'src/config';
import { LOGIN, REGISTER } from 'src/constants/routes.constants';

const { API_ENDPOINT } = config;

const headers = {
  'content-type': 'application/json'
};

const UserService = {
  async authLogin(authToken) {
    const user = await fetch(API_ENDPOINT + LOGIN, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
    return user.json();
  },

  async userLogin({ user_name, password }) {
    let data;
    try {
      const res = await fetch(API_ENDPOINT + LOGIN, {
        method: 'POST',
        headers,
        body: JSON.stringify({ user_name, password })
      });

      if (!res.ok) throw Error;

      data = await res.json();
    } catch (error) {
      console.log(error);
    }

    return data;
  },

  async userRegistration({ user_name, password }) {
    const res = await fetch(API_ENDPOINT + REGISTER[0], {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user_name, password })
    });

    return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
  }
};

export default UserService;
