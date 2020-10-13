import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    const [[key, value]] = Object.entries(token);
    window.localStorage.setItem(key, value);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return true; // TODO - temp return value
    // return !!TokenService.getAuthToken()
  }
};

export default TokenService;
