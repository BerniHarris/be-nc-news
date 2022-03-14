const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const testData = require('../db/data/test-data')
const seed = require('../db/seeds/seed')

// ---- connect and disconnect for each test ----
beforeEach(() => {
  return seed(testData) 
})

afterAll(() => {
  return db.end(); 
});


describe('GET/api/topics', () => {
  describe('GET', () => {
    test('status 200: returns an array of topic objects with a key of slug and description', () => {
       return request(app)
       .get("/api/topics")
       .expect(200)
       .then((res) => {
        expect(res.body.topics.length).toBe(3); 
        res.body.topics.forEach((topic) => {
          expect(topic).toEqual(expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          })) 
        } )   
       })
    })
  });
describe('ERRORS', () => {
  test(`status: 404 - returns a path not found message if topic doesn't exist`, () => {
    return request(app)
      .get('/api/jibberish')
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('Path not found.');
      });
  });
});
});

describe('GET/api/articles/:article_id', () => {
  describe('GET', () => {
    test('status 200: returns an article object with specified properties', () => {
      return request(app)
      .get('/api/articles/1') // ---- as askng for article 1, results should match 1 
      .expect(200)
      .then(({body: {article}}) => {
          expect(article).toBeInstanceOf(Object)
          expect(article).toEqual(
              expect.objectContaining({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 100,
              })
          )
      })
  });
});
describe('ERRORS', () => {
  test(`status: 404 - returns a path not found message if article id doesn't exist`, () => {
    return request(app)
      .get('/api/articles/15')
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(`Article id not found. Please check and try again :)`);
      });
  });
  test(`status: 400 - returns invalid error message if id is not input as a number`, () => {
    return request(app)
      .get('/api/articles/notanumber')
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Not a valid article id. Please check your id number and try again');
      });
  });
});
});

describe('PATCH/api/articles/:article_id', () => {
  describe('PATCH', () => {
      test('status: 200 - updates article votees by an increment of 1', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then((res) => {
            const {article} = res.body
            expect(article).toEqual(
              expect.objectContaining({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: expect.any(String),
                votes: 101,
              })
              );
          });
      });
    });
    describe('ERRORS', () => {
      test(`status: 404 - returns a path not found message if article id doesn't exist`, () => {
        return request(app)
        .patch('/api/articles/15')
        .send({ inc_votes: 1 })
          .expect(404)
          .then((res) => {
            expect(res.body.message).toBe(`Article id not found. Please check and try again :)`);
          });
      });
      test(`status: 400 - returns invalid error message if id is not input as a number`, () => {
        return request(app)
          .patch('/api/articles/notanumber')
          .send({ inc_votes: 1 })
          .expect(400)
          .then((res) => {
            expect(res.body.message).toBe('Not a valid article id. Please check your id number and try again');
          });
      });
    });
});

describe('GET/api/users', () => {
  test("status: 200 - should return an array of users objects with a length of 4", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(res.body.length).toEqual(4);
      });
  });
  test("status: 200 - each user object should contain the property of username", () => {
    return request(app)
    .get('/api/users/')
    .expect(200)
    .then((res) => {
      console.log(res.body)
      res.body.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            })
          );
        });
      });
  });
});

// describe('GET/api/articles', () => {
  
// });

// describe('GET/api/articles/:article:id (comment count)', () => {
  
// });

// describe('GET/api/articles/:article_id/comments', () => {
  
// });

// describe('GET/api/articles (comment count)', () => {
  
// });

// describe('POST/api/articles/:article_id/comments', () => {
  
// });

// describe('GET/api/articles (queries)', () => {
  
// });

// describe('DELETE/api/comments/:comment_id', () => {
  
// });

// describe('GET/api', () => {
  
// });