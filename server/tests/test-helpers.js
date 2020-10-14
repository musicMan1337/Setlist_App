/*
|--------------------------------------------------------------------------
| Seed Data
|--------------------------------------------------------------------------
*/
const ADMIN_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MDI3MDE4OTAsInN1YiI6ImFkbWluIn0.DYRu7tWbt9rNZStYmLb3LfStI39KUMfY7aLHobTHyu8';

const USER_PASSWORDS = { admin: 'admin', user2: 'user2', maliciousUser: 'admin' };

const users = [
  {
    id: 1,
    user_name: 'admin',
    password: '$2a$05$/Hd9nJoDNJIpvEA9GFbN4eyjRyo3rqmNFR0Z9o5eG7oIq5XCUBOhS'
  },
  {
    id: 2,
    user_name: 'user2',
    password: '$2a$05$hhJ6TRwjQVde7zMNXVTeau.i3ubS/L02i36T2rlWyrO74Nzj9jPky'
  }
];

const songs = [
  {
    id: 1,
    song_title: 'Cool Song',
    composer: 'Bok',
    arranger: 'Some guy',
    description: "It's a song!",
    user_id: 1
  },
  {
    id: 2,
    song_title: 'Cooler Song',
    composer: 'Beatoven',
    arranger: 'Some girl',
    description: "It's another song!",
    user_id: 1
  },
  {
    id: 3,
    song_title: 'Meh Song',
    composer: 'Katy Perry',
    arranger: '',
    description: 'It\'s a "song"!',
    user_id: 1
  }
];

const sets = [
  {
    id: 1,
    set_name: 'Set 1',
    description: "It's a set!",
    user_id: 1
  },
  {
    id: 2,
    set_name: 'Set 2',
    description: "It's another set!",
    user_id: 1
  },
  {
    id: 3,
    set_name: 'Set 3',
    description: 'It\'s a "set"!',
    user_id: 1
  }
];

const songs_sets = [
  {
    set_id: 1,
    song_id: 1
  },
  {
    set_id: 1,
    song_id: 2
  },
  {
    set_id: 2,
    song_id: 1
  },
  {
    set_id: 2,
    song_id: 3
  }
];

const maliciousUserSeed = {
  id: 3,
  user_name: 'Naughty <script>alert("xss");</script>',
  password: '$2a$05$/Hd9nJoDNJIpvEA9GFbN4eyjRyo3rqmNFR0Z9o5eG7oIq5XCUBOhS'
};

const maliciousSongSeed = {
  id: 3,
  song_title: 'Naughty <script>alert("xss");</script>',
  composer: 'Naughty <script>alert("xss");</script>',
  arranger: 'Naughty <script>alert("xss");</script>',
  description: 'Naughty <script>alert("xss");</script>',
  user_id: 1
};

const maliciousSetSeed = {
  id: 3,
  set_name: 'Naughty <script>alert("xss");</script>',
  description: 'Naughty <script>alert("xss");</script>',
  user_id: 1
};

/*
|--------------------------------------------------------------------------
| Client-side submission data
|--------------------------------------------------------------------------
*/
const headers = {
  'content-type': 'application/json',
  Authorization: `Bearer ${ADMIN_JWT}`
};

const safeUser = {
  request: {
    user_name: 'newUser',
    password: 'password'
  },

  result: {
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2MDI3MDQ1MzEsInN1YiI6Im5ld1VzZXIifQ.wSFQKHrQtj58q_VPMRLI7XtOKO3eyPJgXu1skvs52TE',
    user_name: 'muser'
  }
};

const maliciousUser = {
  request: {
    user_name: 'Naughty <script>alert("xss");</script>',
    password: 'Naughty <script>alert("xss");</script>'
  },

  result: {
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJpYXQiOjE2MDI3MDU3MzMsInN1YiI6InVzZXIxIn0.y9LECOdoPiEEwVKaPxHqZ3MbHDiOtBsdk8NJenHe7Wk',
    user_name: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;'
  }
};

const safeSong = {
  request: {
    song_title: 'Good Song',
    composer: 'newComp',
    arranger: 'newArr',
    description: 'newDesc'
  },

  result: {
    id: 4,
    song_title: 'Good Song',
    composer: 'newComp',
    arranger: 'newArr',
    description: 'newDesc',
    user_id: 1
  }
};

const maliciousSong = {
  request: {
    song_title: 'Naughty <script>alert("xss");</script>',
    composer: 'Naughty <script>alert("xss");</script>',
    arranger: 'Naughty <script>alert("xss");</script>',
    description: 'Naughty <script>alert("xss");</script>'
  },

  result: {
    id: 4,
    song_title: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    composer: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    arranger: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    user_id: 1
  }
};

const safeSet = {
  request: {
    set_name: 'Good Set',
    description: 'newDesc'
  },

  result: {
    id: 4,
    set_name: 'Good Set',
    description: 'newDesc',
    user_id: 1,
    songs: []
  }
};

const maliciousSet = {
  request: {
    set_name: 'Naughty <script>alert("xss");</script>',
    description: 'Naughty <script>alert("xss");</script>'
  },

  result: {
    id: 4,
    set_name: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    user_id: 1,
    songs: []
  }
};

const newSongSet = {
  song_id: 1,
  set_id: 3
};

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/
const cleanTables = (db) => {
  return db.raw(`TRUNCATE users RESTART IDENTITY CASCADE`);
};

const getSeedData = () => ({ users, songs, sets, songs_sets });
const seedTables = (db, table, data) => db(table).insert(data);

const getMaliciousSeedData = () => ({
  maliciousUserSeed,
  maliciousSongSeed,
  maliciousSetSeed
});
const seedMaliciousData = (db, table, data) => db(table).insert(data);

const getClientSubmissions = () => ({ safeUser, safeSong, safeSet, newSongSet });
const getMaliciousSubmissions = () => ({
  maliciousUser,
  maliciousSong,
  maliciousSet
});

const createFetchRequest = (method, table, malicious = false) => {
  const endpoint = `${TEST_DB_URL}/${table}`;
  const tags = {
    method,
    headers
  };

  if (method !== 'GET') {
    switch (table) {
      case 'users':
        tags.body = malicious ? maliciousUser : safeUser;
        break;

      case 'songs':
        tags.body = malicious ? maliciousSong : safeSong;
        break;

      case 'sets':
        tags.body = malicious ? maliciousSet : safeSet;
        break;

      case 'songs_sets':
        tags.body = newSongSet;
        break;

      default:
        break;
    }
  }

  return { endpoint, tags };
};

module.exports = {
  ADMIN_JWT,
  USER_PASSWORDS,

  cleanTables,
  getSeedData,
  seedTables,
  getMaliciousSeedData,
  seedMaliciousData,

  getClientSubmissions,
  getMaliciousSubmissions,

  createFetchRequest
};
