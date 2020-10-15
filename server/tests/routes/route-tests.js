const { JWT } = require('../test-helpers');

// DELETE THIS!!! (it's for IntelliSense)
const { expect } = require('chai');

const Get = {
  noData: (app, endpoint) => {
    return supertest(app).get(endpoint).set('Authorization', JWT).expect(502, []);
  },

  withData: (app, endpoint, expectedData) => {
    return supertest(app)
      .get(endpoint)
      .set('Authorization', JWT)
      .expect(200, expectedData);
  }
};

const GetId = {
  noData: (app, endpoint, id, message) => {
    return supertest(app)
      .get(endpoint + id)
      .set('Authorization', JWT)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).to.eql("Not found - /setapp/v1/songs2")
      })
  },

  withData: (app, endpoint, id, expectedData) => {
    return supertest(app)
      .get(endpoint + id)
      .set('Authorization', JWT)
      .expect(200, expectedData);
  }
};

module.exports = {
  Get,
  GetId
};
