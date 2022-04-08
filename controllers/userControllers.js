const { fetchUserNames } = require("../models/userModels");
const fs = require("fs");

const getUserNames = (req, res, next) => {
  fetchUserNames()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getApi = (req, res, next) => {
  let allEndpoints;
  fs.readFile("endpoints.json", "utf8", function (err, data) {
    allEndpoints = JSON.parse(data);
    res.status(200).send(allEndpoints);
  });
};

// Controller: Handles the client request, and using the information contained
// on the request (path, params, queries and body) will invoke the model which
// will interact with the dataset, and will then send a response to the client
// with the appropriate data.

module.exports = { getUserNames, getApi };
