const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

const fetchUserNames = () => {
  return db.query("SELECT username FROM users;").then(({ rows }) => {
    return rows;
  });
};

module.exports = {
  fetchUserNames,
};
