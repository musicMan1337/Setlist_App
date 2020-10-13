import config from 'src/config';
import { LOGIN, REGISTER } from 'src/constants/routes.constants';

const { API_ENDPOINT } = config;

const UserService = {
  async userLogin(user_name, password) {
    const res = await fetch(API_ENDPOINT + LOGIN[0], {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        user_name,
        password
      }
    });

    return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
  },

  async userRegistration(user_name, password) {
    const res = await fetch(API_ENDPOINT + REGISTER[0], {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        user_name,
        password
      }
    });

    return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
  }
};

export default UserService;
