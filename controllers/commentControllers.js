const {
  fetchCommentsByArticleId,
  addCommentToArticleId,
} = require("../models/commentModels");
const { checkArticleExists } = require("../models/articleModels");

const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    fetchCommentsByArticleId(article_id),
    checkArticleExists(article_id),
  ])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postCommentToArticleId = (req, res, next) => {
  const { article_id: article_id } = req.params;
  const userComment = req.body;
  addCommentToArticleId(article_id, userComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = {
  getArticleComments,
  postCommentToArticleId,
};

// Controller: Handles the client request, and using the information contained
// on the request (path, params, queries and body) will invoke the model which
// will interact with the dataset, and will then send a response to the client
// with the appropriate data.
