import config from 'src/config';
import {
  SONGS_SETS_LINK,
  SETS_GIGS_LINK
} from 'src/constants/routes.constants';

const { API_ENDPOINT } = config;

const PostService = {
  async createSomething(table, body) {
    const res = await fetch(API_ENDPOINT + table, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
  },

  updateSongSet(song_id, set_id) {
    return fetch(API_ENDPOINT + SONGS_SETS_LINK, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ song_id, set_id })
    });
  },

  updateSetGig(set_id, gig_id) {
    return fetch(API_ENDPOINT + SETS_GIGS_LINK, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(set_id, gig_id)
    });
  }
};

export default PostService;
