import config from 'src/config';

import { TokenService } from 'src/services';

const { API_ENDPOINT } = config;

const getHeaders = () => {
  const authToken = TokenService.getAuthToken();

  return {
    'content-type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
};

const PatchService = {
  async updateSomething(table, body) {
    try {
      const headers = getHeaders();

      await fetch(API_ENDPOINT + table, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default PatchService;
