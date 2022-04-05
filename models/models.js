const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return { topics: rows };
  });
};

const fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (!rows[0]) {
        // custom error
        return Promise.reject({
          status: 404,
          msg: "Article id not found. Please check and try again :)",
        });
      }
      return rows[0]; // ---- future berni this is the article object :)
    });
};

const updateArticle = (article_id, inc_votes) => {
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Please include missing fields",
    });
  } else
    return db
      .query(
        `UPDATE articles 
            SET votes = (votes + $1) 
            WHERE article_id = $2 RETURNING *;`,
        [inc_votes, article_id]
      )
      .then(({ rows }) => {
        if (!rows[0]) {
          // custom error
          return Promise.reject({
            status: 404,
            msg: "Article id not found. Please check and try again :)",
          });
        }
        return rows[0];
      });
};

const fetchUserNames = () => {
  return db.query("SELECT username FROM users;").then(({ rows }) => {
    return rows;
  });
};

const fetchArticles = () => {
  return db.query("SELECT * FROM articles;").then(({ rows }) => {
    return { articles: rows };
  });
};

const checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      else return rows;
    });
};

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
// Model: Handles the fetching, updating, creating and deleting of data,
// and sends the data in the required format to the controller based on controller’s
// instructions.

module.exports = {
  fetchTopics,
  fetchArticleById,
  updateArticle,
  fetchUserNames,
  fetchArticles,
  checkArticleExists,
  fetchCommentsByArticleId,
};
