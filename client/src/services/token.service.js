import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem('authToken', token);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken()
  }
};

export default TokenService;
