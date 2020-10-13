const CRUDService = {

  getAllData(db, table) {
    return db(table).select('*');
  },

  getById(db, table, id) {
    return db(table).where({ id }).first();
  },

  deleteById(db, table, id) {
    return db(table).where({ id }).del();
  },

  createEntry(db, table, newEntry) {
    return db(table).insert(newEntry, '*')
  },

  updateEntry(db, table, id, newEntry) {
    return db(table).where({ id }).update(newEntry, '*');
  },

  // case for user login
  getByName(db, user_name) {
    return db('users').where({ user_name }).first();
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
