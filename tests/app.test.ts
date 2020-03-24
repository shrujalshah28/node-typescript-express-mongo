import request from 'supertest';

import app from '../src/app';

describe('App Test', () => {
  test('GET /random-url should return 404', async (done) => {
    await request(app).get('/random-url').expect(404);
    done();
  });

  test('GET /v1/status should return 200', (done) => {
    request(app).get('/v1/status').expect(200, done);
  });
});
