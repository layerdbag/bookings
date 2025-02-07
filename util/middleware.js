const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'Token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'Token missing' })
  }

  next()
}


const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' });
  next();
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
