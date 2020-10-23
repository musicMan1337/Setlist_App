const application = require('../dist/app');

const app = application.default;

describe('App', () => {
  it('GET / responds with 200 containing "Express boilerplate initialized!"', () => {
    return supertest(app).get('/').expect(200, 'Express boilerplate initialized!');
  });
});
