const usersRouter = require('express').Router();
const user_schema = require('../models/users_eschema');
const jwt = require('jsonwebtoken');

// Encrypt password
const bcrypt = require('bcrypt');
const extract_user_token = require('../middleware/extract_user_token');

usersRouter.get('/', extract_user_token, async (req, res) => {
  const { userId } = req;

  const users = await user_schema.find({ _id: userId }).populate('notes', {
    user: 0,
  });

  res.json(users).status(200);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { user, password, userName } = req.body;

    if (!user || !password || !userName)
      return res.status(400).json({
        error: 'Missing data',
        estructure: {
          user: 'example',
          password: 'example123_$',
          userName: 'example',
        },
      });
    else if (user.length < 8 || password.length < 8 || userName.length < 4) {
      return res.status(400).json({
        error: {
          userName: `${userName}(${userName.length}) most be longuer than 4`,
          user: `${user}(${user.length}) most be longuer than 8`,
          password: `${password}(${password.length}) most be longuer than 8`,
        },
      });
    }

    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    const data = new user_schema({
      userName,
      user,
      passwordHash: passwordHashed,
    });

    const response = await data.save();

    const payload = {
      _id: response._id,
      userName: response.userName,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 15,
    });

    res
      .json({
        user: response.user,
        userName: response.userName,
        _id: response._id,
        notes: response.notes,
        token,
      })
      .status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { usersRouter, user_schema };
