const express = require('express');
const { getTopics } = require('./controllers/topicControllers')
const { getArticleById } = require('./controllers/articleControllers')
const {error404, customError, psqlError, error500} = require('./errors/errors')
const app = express();

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

app.all('/*', error404)

app.use(customError)
app.use(psqlError)
app.use(error500)


module.exports = app;