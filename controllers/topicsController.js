const {fetchTopics} = require('../models/topicsModel'); 
//^allows access to topics already found

const getTopics = (req,res) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
    .catch((err) => {
        console.log(err)
    })
}

console.log(fetchTopics)
console.log(getTopics)

module.exports = {getTopics}