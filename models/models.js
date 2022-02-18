const db = require('../db/connection'); 

const fetchTopics = () => {
    return db
    .query("SELECT * FROM topics;")
    .then(({rows}) => { 
        return {topics: rows}
    })
}

const fetchArticleById = (article_id) => {
    return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
        .then(({ rows }) => {
         if(!rows[0]) { // custom error
             return Promise.reject({ status: 404, msg: 'Article id not found. Please check and try again :)' })
         }
         return rows[0]; // ---- future berni this is the article object :)
        })
    } 




module.exports = {fetchTopics, fetchArticleById} 