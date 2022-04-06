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

// app.post("/expressions", (req, res, next) => {
//   const receivedExpression = createElement("expressions", req.query);
//   if (receivedExpression) {
//     expressions.push(receivedExpression);
//     res.status(201).send(receivedExpression);
//   } else {
//     res.status(400).send();
//   }
// });

module.exports = {
  fetchCommentsByArticleId,
};
