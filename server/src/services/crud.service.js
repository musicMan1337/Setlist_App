const CRUDService = {

  getAllData(db, table, user_id) {
    return db(table).select('*').where({ user_id });
  },

  getById(db, table, id, user_id) {
    return db(table).where({ id, user_id }).first();
  },

  deleteById(db, table, id, user_id) {
    return db(table).where({ id, user_id }).del();
  },

  createEntry(db, table, newEntry) {
    return db(table).insert(newEntry, '*')
  },

  updateEntry(db, table, id, user_id, newEntry,) {
    return db(table).where({ id, user_id }).update(newEntry, '*');
  },

  // case for user login
  getByName(db, user_name) {
    return db('users').where({ user_name }).first(['id', 'user_name']);
  },

  // cases for linkage tables
  deleteSSLink(db, song_id, set_id) {
    return db('songs_sets').where({ song_id, set_id }).del();
  },

  deleteSGLink(db, set_id, gig_id) {
    return db('sets_gigs').where({ set_id, gig_id }).del();
  }
};

module.exports = CRUDService;
