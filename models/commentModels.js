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

const deleteComment = (comment_id) => {
  return db
    .query(
      `
    DELETE FROM comments
    WHERE comment_id = $1;`,
      [comment_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const checkCommentExists = (comment_id) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1;", [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Comment not found",
        });
      else return rows;
    });
};

module.exports = {
  fetchCommentsByArticleId,
  addCommentToArticleId,
  deleteComment,
  checkCommentExists,
};
