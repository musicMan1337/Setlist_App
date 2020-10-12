import config from 'src/config'
import { LOGIN, REGISTER } from 'src/constants/routes.constants';

const { API_ENDPOINT } = config

const UserService = {
  userLogin(user_name, password) {
    return fetch(API_ENDPOINT + LOGIN[0], {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        user_name,
        password
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  userRegistration(user_name, password) {
    return fetch(API_ENDPOINT + REGISTER[0], {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        user_name,
        password
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default UserService
