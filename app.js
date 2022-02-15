const express = require('express');
const { getTopics } = require('./controllers/topicsController')
console.log(getTopics)
const app = express();

app.get('/api/topics', getTopics)

module.exports = app;

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Server Error!');
  });

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'path not found'});
});

// where does listen go? - not needed for tests - further on
