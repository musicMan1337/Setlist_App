const dev = {
  API_ENDPOINT: 'http://localhost:8000/setapp/v1',
  API_KEY: 'so_secret',
  TOKEN_KEY: 'authToken'
};

const prod = {
  API_ENDPOINT: 'https://glacial-basin-85263.herokuapp.com/setapp/v1',
  TOKEN_KEY: 'authToken'
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config
};
