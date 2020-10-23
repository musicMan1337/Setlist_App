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

const DeleteService = {
  async deleteSomething(
    table: string,
    id: number | string,
    linkId: number | null = null
  ) {
    if (linkId) id = `${id}-${linkId}`;
    try {
      const headers = getHeaders();

      await fetch(`${API_ENDPOINT}${table}/${id}`, {
        method: 'DELETE',
        headers
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default DeleteService;
