const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

const fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, 
        COUNT(comments.article_id)::INT AS comment_count FROM articles 
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id 
        WHERE articles.article_id = $1 
        GROUP BY articles.article_id;`,
      [article_id]
    )
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

const fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  if (
    !["article_id", "author", "created_at", "title", "topic", "votes"].includes(
      sort_by
    ) // <--- complex query notes
  ) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  if (
    !["cats", "mitch", "coding", "football", "cooking", undefined].includes(
      topic
    )
  ) {
    return Promise.reject({ status: 400, msg: "Invalid topic query" });
  }
  // ------ sorting by topics ------
  const topicSort = "";

  if (topic === undefined) {
    topicSort === "";
  } else {
    topicSort === `WHERE topic = '${topic}'`;
  } // <--- if not defined then the empty string will allow all articles to be selected... if defined they will be selected by the topic

  return db
    .query(
      `SELECT articles.*, 
      COUNT(comments.article_id)::INT AS comment_count 
      FROM articles ${topicSort}
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id 
      GROUP BY articles.article_id 
      ORDER BY ${sort_by} ${order};`
    )
    .then(({ rows }) => {
      return { articles: rows };
    });
};

module.exports = {
  fetchArticleById,
  updateArticle,
  checkArticleExists,
  fetchArticles,
};
