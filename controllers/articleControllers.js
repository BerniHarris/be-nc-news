const {fetchArticleById} = require('../models/models'); 

const getArticleById = (req, res, next) => {
    const { article_id: articleId } = req.params;
    fetchArticleById(articleId)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
};


module.exports = {getArticleById}