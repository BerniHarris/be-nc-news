const express = require("express");
const { getTopics } = require("./controllers/topicControllers");
const {
  getArticleById,
  patchArticle,
  getArticles,
  getArticleComments,
} = require("./controllers/articleControllers");
const { getUserNames, getApi } = require("./controllers/userControllers");
const {
  postCommentToArticleId,
  deleteCommentById,
} = require("./controllers/commentControllers");
const {
  error404,
  customError,
  psqlError,
  error500,
} = require("./errors/errors");
const app = express();

app.use(express.json());

app.get("/api", getApi);

//-------TOPIC ENDPOINTS------
app.get("/api/topics", getTopics);

//-------USER ENDPOINTS------
app.get("/api/users", getUserNames);

//-------ARTICLE ENDPOINTS------
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticle);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postCommentToArticleId);

//-------COMMENT ENDPOINTS------
app.delete("/api/comments/:comment_id", deleteCommentById);

//-------ALL------
app.all("/*", error404);

//-------ERROR HANDLERS------
app.use(customError);
app.use(psqlError);
app.use(error500);

module.exports = app;
