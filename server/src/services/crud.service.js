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

  // special case for user login
  getByName(db, user_name) {
    return db('users').where({ user_name }).first();
  }
};

module.exports = CRUDService;
