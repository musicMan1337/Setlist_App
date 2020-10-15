const knex = require('knex');

const app = require('../../src/app');
const { API, SONGS_TABLE } = require('../../src/constants/table.constants');

const helpers = require('../test-helpers');
const { Get, GetId } = require('./route-tests');

describe('Route: Songs router', () => {
  const { expectedSongs } = helpers.getExpectedData();

  const ENDPOINT = `${API}/${SONGS_TABLE}`;

  let db;
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DB_URL
    });
    app.set('db', db);
  });

  afterEach('cleanup', () => helpers.cleanTables(db));

  after('disconnect from db', () => db.destroy());

  const seedAllTablesHook = () =>
    beforeEach('seed all data', () => helpers.seedAllTables(db));

  const seedUsersHook = () =>
    beforeEach('seed users', () => helpers.seedUsers(db));

  describe.only('GET /songs', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and returns empty array', () =>
        Get.noData(app, ENDPOINT, expectedSongs));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns all songs', () =>
        Get.withData(app, ENDPOINT, expectedSongs));
    });
  });

  describe.only('GET /songs/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 404 and returns error message', () =>
        GetId.noData(app, ENDPOINT, 2));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it(
        'responds with 200 and returns all songs',
        GetId.withData(app, ENDPOINT, 2, expectedSongs[1])
      );
    });
  });

  describe('POST /songs', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and return empty array', () => {
        return supertest(app)
          .get(`${API}/${SONGS_TABLE}`)
          .set('Authorization', JWT)
          .expect(502, { message: 'No songs found' });
      });
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and return all songs', () => {
        return supertest(app)
          .get(`${API}/${SONGS_TABLE}`)
          .set('Authorization', JWT)
          .expect(200, expectedSongs);
      });
    });
  });

  describe('PATCH /songs/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and return empty array', () => {
        return supertest(app)
          .get(`${API}/${SONGS_TABLE}`)
          .set('Authorization', JWT)
          .expect(502, { message: 'No songs found' });
      });
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 502 and return empty array', () => {
        return supertest(app)
          .get(`${API}/${SONGS_TABLE}`)
          .set('Authorization', JWT)
          .expect(200, expectedSongs);
      });
    });
  });

  describe('DELETE /songs/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and return empty array', () => {
        return supertest(app)
          .get(`${API}/${SONGS_TABLE}`)
          .set('Authorization', JWT)
          .expect(502, { message: 'No songs found' });
      });
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 502 and return empty array', () => {
        return supertest(app)
          .get(`${API}/${SONGS_TABLE}`)
          .set('Authorization', JWT)
          .expect(200, expectedSongs);
      });
    });
  });
});
