const verifyRouter = require('express').Router();

// MiddleWare´s
const extract_user = require('../middleware/extract_user_token');

verifyRouter.get('/', extract_user, (req, res) => {
  const { decodeToken } = req;

  res.json({ decodeToken });
});

module.exports = verifyRouter;
