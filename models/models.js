const db = require('../db/connection'); 

const fetchTopics = () => {
    return db
    .query("SELECT * FROM topics;")
    .then(({rows}) => { 
        return {topics: rows}
    })
}

const fetchArticlesById = (article_id) => {
    return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
        .then(({ rows }) => {
         if(!rows[0]) { // custom error
             return Promise.reject({ status: 404, msg: 'Path not found.' })
         }
            console.log(rows[0])
         return rows[0];

    })
} 




module.exports = {fetchTopics, fetchArticlesById} 