const {fetchArticleById, updateArticle} = require('../models/models'); 

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

const patchArticle = (req, res, next) => {
    const { article_id } = req.params;
    const {inc_votes} = req.body;

    updateArticle(article_id, inc_votes)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err)
      })
  };

module.exports = {getArticleById, patchArticle}