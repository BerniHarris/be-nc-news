const express = require('express');
const { getTopics, getArticlesById } = require('./controllers/controllers')
console.log(getTopics)
const app = express();

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticlesById);

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Path not found.'});
});

// ---- custom errors ----
app.use((err, req, res, next) => {
  if( err.status && err.msg) {
    res.status(err.status).send({ message: err.msg })
  } else {
    next(err) // don't forget this moves you down to next app block
  }
})

// ---- PSQL errors ----
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: 'Bad request.'})
  }  else {
    next(err)
  }
})

// ---- final error! ----
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error!');
});

module.exports = app;