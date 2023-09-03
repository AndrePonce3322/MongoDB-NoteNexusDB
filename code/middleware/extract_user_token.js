const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(400).json({
      error: 'Token authorization not send on the header',
    });
  } else if (!authorization.toLowerCase().startsWith('bearer')) {
    return res.status(400).json({
      error: 'Token authorization not send on the header with `Bearer`',
    });
  }

  // Taking the second value of the array of authorization TOKEN
  const userToken = authorization.substring(7);

  try {
    const decodeToken = jwt.verify(userToken, process.env.TOKEN_SECRET_KEY);
    // Result
    req.userId = decodeToken._id;
    req.userName = decodeToken.userName;

    // Go to the next route
    next();
  } catch (error) {
    next(error);
  }
};
