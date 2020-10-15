const knex = require('knex');
const app = require('../../src/app');
const helpers = require('../test-helpers');

describe('Route: Gigs router', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'db',
      connection: TEST_DB_URL
    });
    app.set('db', db);
  });

  before('cleanup', () => db.cleanTables(db));

  afterEach('cleanup', () => db.cleanTables(db));

  after('disconnect from db', () => db.destroy());

  const seedAllTablesHook = () =>
    beforeEach('seed data', () => helpers.seedAllTables(db));

  describe('GET /gigs', () => {
    context('Given no data', () => {});
    context('Given data exists', () => {
      seedAllTablesHook();
    });
  });

  describe('GET /gigs/:id', () => {
    context('Given no data', () => {});
    context('Given data exists', () => {
      seedAllTablesHook();
    });
  });

  describe('POST /gigs', () => {
    context('Given no data', () => {});
    context('Given data exists', () => {
      seedAllTablesHook();
    });
  });

  describe('PATCH /gigs/:id', () => {
    context('Given no data', () => {});
    context('Given data exists', () => {
      seedAllTablesHook();
    });
  });

  describe('DELETE /gigs/:id', () => {
    context('Given no data', () => {});
    context('Given data exists', () => {
      seedAllTablesHook();
    });
  });
});
