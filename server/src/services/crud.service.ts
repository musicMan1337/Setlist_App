import Knex from 'knex';

const CRUDService = {
  getAllData(db: Knex, table: string, user_id: number) {
    return db(table).select('*').where({ user_id });
  },

  getById(db: Knex, table: string, id: number, user_id: number) {
    return db(table).where({ id, user_id }).first();
  },

  createEntry(db: Knex, table: string, newEntry: object) {
    return db(table).insert(newEntry, '*');
  },

  updateEntry(
    db: Knex,
    table: string,
    id: number,
    user_id: number,
    newEntry: object
  ) {
    return db(table).where({ id, user_id }).update(newEntry, '*');
  },

  deleteById(db: Knex, table: string, id: number) {
    return db(table).where({ id }).del();
  },

  // case for user login
  getByName(db: Knex, user_name: string) {
    return db('users').where({ user_name }).first('*');
  },

  // cases for linkage tables
  deleteSSLink(db: Knex, song_id: number, set_id: number) {
    return db('songs_sets').where({ song_id, set_id }).del();
  },

  deleteSGLink(db: Knex, set_id: number, gig_id: number) {
    return db('sets_gigs').where({ set_id, gig_id }).del();
  },

  // for testing linkage tables
  getAllLinks(db: Knex, table: string) {
    return db(table).select('*');
  }
};

export default CRUDService;
