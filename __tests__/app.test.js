const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const testData = require('../db/data/test-data')
const seed = require('../db/seeds/seed')

beforeEach(() => {
  return seed(testData)
})

afterAll(() => {
  return db.end();
});
// 404 error before or after?
describe('GET /api/topics', () => {
  test('status 200: returns an array of topic objects with a key of slug and description', () => {
     return request(app)
     .get("/api/topics")
     .expect(200)
     .then((res) => {
      expect(res.body.topics.length).toBe(3);     //topics to have 3 topics
      res.body.topics.forEach((topic) => {
        expect(topic).toEqual(expect.objectContaining({
          slug: expect.any(String),
          description: expect.any(String),
        }))  // minimum contains these prop
      } )       // contain slug and description
     })
  })
});

//tested loosely- when using id etc need to be more specific

describe('errors', () => {
  test('status: 404 - returns a path not found message', () => {
    return request(app)
      .get('/api/jibberish')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('path not found');
      });
  });
});
