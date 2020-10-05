const dev = {
  API_ENDPOINT: 'http://localhost:8000',
  API_KEY: 'so_secret'
};

const prod = {
  API_ENDPOINT: 'https://'
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config
};
