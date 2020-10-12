import config from 'src/config';

const { API_ENDPOINT } = config;

const PatchService = {
  updateSomething(table, body) {
    return fetch(API_ENDPOINT + table, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
};

export default PatchService;
