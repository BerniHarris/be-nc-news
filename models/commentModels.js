const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
    SELECT comment_id, votes, created_at, author, body
    FROM comments
    WHERE article_id = $1;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const addCommentToArticleId = (article_id, { username: author, body }) => {
  return db
    .query(
      `INSERT INTO comments
    (article_id, author, body)
    Values ($1, $2, $3)
    RETURNING *;`,
      [article_id, author, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = {
  fetchCommentsByArticleId,
  addCommentToArticleId,
};
