import config from 'src/config';

const TokenService = {
  saveAuthToken(token: string): void {
    window.localStorage.setItem('authToken', token);
  },

  getAuthToken(): string | null {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken(): void {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  }
};

export default TokenService;
