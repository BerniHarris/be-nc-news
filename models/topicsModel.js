const db = require('../db/connection'); 
const fetchTopics = () => {
    return db
    .query("SELECT * FROM topics;")
    .then(({rows}) => { //forgot why {rows? ask tutor}
        return {topics: rows}
    })
}

module.exports = {fetchTopics} 