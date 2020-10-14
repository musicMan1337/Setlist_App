const knex = require('knex');
const app = require('../../src/app');

describe('Route: Songs router', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'db',
      connection: TEST_DB_URL
    });
    app.set('db', db);
  });

  before('cleanup', () => db.cleanTables(db))

  afterEach('cleanup', () => db.cleanTables(db))

  after('disconnect from db', () => db.destroy())

  describe('GET /songs (with auth)', () => {});

  describe('GET /songs/:id', () => {});

  describe('POST /songs', () => {});

  describe('PATCH /songs/:id', () => {});

  describe('DELETE /songs/:id', () => {});
})