const express = require('express');
const { getTopics } = require('./controllers/topicControllers')
const { getArticleById, patchArticle } = require('./controllers/articleControllers')
const { getUserNames } = require('./controllers/userControllers')
const {error404, customError, psqlError, error500} = require('./errors/errors')
const app = express();

app.use(express.json())

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/users', getUserNames);

app.patch('/api/articles/:article_id', patchArticle)

app.all('/*', error404)

app.use(customError)
app.use(psqlError)
app.use(error500)


module.exports = app;