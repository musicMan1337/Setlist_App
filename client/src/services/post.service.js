import config from 'src/config';
import {
  SONGS_SETS_LINK,
  SETS_GIGS_LINK
} from 'src/constants/routes.constants';

import { TokenService } from 'src/services';

const { API_ENDPOINT } = config;

const getHeaders = () => {
  const authToken = TokenService.getAuthToken();

  return {
    'content-type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
};

const PostService = {
  async createSomething(table, body) {
    try {
      const headers = getHeaders();

      await fetch(API_ENDPOINT + table, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error);
    }
  },

  async updateSongSet(song_id, set_id) {
    try {
      const headers = getHeaders();

      await fetch(API_ENDPOINT + SONGS_SETS_LINK, {
        method: 'POST',
        headers,
        body: JSON.stringify({ song_id, set_id })
      });
    } catch (error) {
      console.log(error);
    }
  },

  async updateSetGig(set_id, gig_id) {
    try {
      const headers = getHeaders();

      await fetch(API_ENDPOINT + SETS_GIGS_LINK, {
        method: 'POST',
        headers,
        body: JSON.stringify({ set_id, gig_id })
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default PostService;
