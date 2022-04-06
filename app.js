const express = require("express");
const { getTopics } = require("./controllers/topicControllers");
const {
  getArticleById,
  patchArticle,
  getArticles,
  getArticleComments,
} = require("./controllers/articleControllers");
const { getUserNames } = require("./controllers/userControllers");
const {
  error404,
  customError,
  psqlError,
  error500,
} = require("./errors/errors");
const app = express();

app.use(express.json());

//-------TOPIC ENDPOINTS------
app.get("/api/topics", getTopics);

//-------USER ENDPOINTS------
app.get("/api/users", getUserNames);

//-------ARTICLE ENDPOINTS------
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticle);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", getArticleById);

//-------ALL------
app.all("/*", error404);

//-------ERROR HANDLERS------
app.use(customError);
app.use(psqlError);
app.use(error500);

module.exports = app;
