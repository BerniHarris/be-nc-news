const { fetchTopics } = require("../models/models");

const getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch((err) => {
      next(err);
    });
};

// Controller: Handles the client request, and using the information contained
// on the request (path, params, queries and body) will invoke the model which
// will interact with the dataset, and will then send a response to the client
// with the appropriate data.

module.exports = { getTopics };
