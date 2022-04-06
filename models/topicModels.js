const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return { topics: rows };
  });
};

module.exports = {
  fetchTopics,
};

// Model: Handles the fetching, updating, creating and deleting of data,
// and sends the data in the required format to the controller based on controller’s
// instructions.
