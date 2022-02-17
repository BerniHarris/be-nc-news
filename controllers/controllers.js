const {fetchTopics, fetchArticlesById} = require('../models/models'); 

const getTopics = (req,res) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
    .catch((err) => {
        console.log(err)
    })
}

const getArticlesById = (req, res, next) => {
    const { article_id: articleId } = req.params;
    fetchArticlesById(articleId)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
};




module.exports = {getTopics, getArticlesById}