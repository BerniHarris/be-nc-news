const error404 = ('/*', (req, res) => {
    res.status(404).send({ message: 'Path not found.'});
  });
  
  // ---- custom errors ----
  const customError = (err, req, res, next) => {
    if( err.status && err.msg) {
      res.status(err.status).send({ message: err.msg })
    } else {
      next(err) // don't forget this moves you down to next app block
    }
  }
  
  // ---- PSQL errors ----
  const psqlError = (err, req, res, next) => {
    if (err.code === "22P02") {
      res.status(400).send({ message: 'Not a valid article id. Please check your id number and try again'})
    }  else {
      next(err)
    }
  }
  
  // ---- final error! ----
  const error500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send('Server Error!');
  };
  

  module.exports = {error404,customError,psqlError,error500}