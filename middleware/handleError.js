const ERROR_HANDLERS = {
  CastError: (res) =>
    res.status(400).json({ error: 'Estás usando mal la ID' }),
  JsonWebTokenError: (res) =>
    res.status(406).json({ error: 'Invalid web token' }),
  SyntaxError: (res) => 
    res.status(406).json({ error: 'Syntax Error, token invalid' }),
  TokenExpiredError: (res) =>
    res.status(400).json({ error: 'Token expired' }),
  MongoNotConnectedError: (res) =>
    res.status(200).json({error: 'server error!'}),
  defaultError: (res) => res.status(500).end(),
};

module.exports = (error, req, res, next) => {
  console.log(error.name);

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(res);
};
