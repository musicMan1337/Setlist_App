import config from 'src/config';

const { API_ENDPOINT } = config;

const DeleteService = {
  deleteSomething(table, id, linkId = null) {
    if (linkId) id = `${id}-${linkId}`;
    return fetch(`${API_ENDPOINT}${table}/${id}`, {
      method: 'DELETE'
    });
  }
};

export default DeleteService;
