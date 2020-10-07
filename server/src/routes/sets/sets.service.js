const xss = require('xss')

const SetsService = {
  getAllSets(db) {},

  getById(db, id) {},

  deleteById(db, id) {},

  createSet(db, newSet) {},

  updateSet(db, id, newSet) {},

  serializeSet(set) {
    return {
      set_name: xss(set.set_name),
      description: xss(set.description),
      user_id: set.user_id
    }
  },

  serializeSets(sets) {
    return sets.map(this.serializeSets)
  }
}

module.exports = SetsService