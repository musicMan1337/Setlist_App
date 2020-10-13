import config from 'src/config';

const { API_ENDPOINT } = config;

const PatchService = {
  async updateSomething(table, body) {
    const res = await fetch(API_ENDPOINT + table, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
  }
};

export default PatchService;
