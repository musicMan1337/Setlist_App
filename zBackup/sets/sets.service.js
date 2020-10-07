const xss = require('xss');

const SetsService = {
  getAllSets(db) {
    return db('sets').select('*');
  },

  getById(db, id) {
    return db('sets').where({ id }).first();
  },

  deleteById(db, id) {
    return db('sets').where({ id }).del();
  },

  createSet(db, newSet) {
    return db('sets').insert(newSet, '*');
  },

  updateSet(db, id, newSet) {
    return db('sets').where({ id }).update(newSet, '*');
  },

  serializeSet(set) {
    return {
      set_name: xss(set.set_name),
      description: xss(set.description),
      user_id: set.user_id
    };
  },

  serializeSets(sets) {
    return sets.map(this.serializeSets);
  }
};

module.exports = SetsService;
