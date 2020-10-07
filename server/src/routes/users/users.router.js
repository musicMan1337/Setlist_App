const express = require('express');

const AuthService = require('./users.service');
const bodyVal = require('../../middlewares/body.val');
const auth = require('../../middlewares/auth');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter
  .route('/login')
  .all(jsonBodyParser, bodyVal.loginBody)
  .get((req, res, next) => {
    AuthService.getByName(req.app.get('db'), res.loginUser.user_name)
      .then((dbUser) => {
        if (!dbUser) {
          return res
            .status(400)
            .json({ error: `Incorrect 'User Name'` });
        }

        AuthService.comparePasswords()

        const sub = dbUser.user_name;
        const payload = { user_id: dbUser.id };
        return res.json({
          authToken: AuthService.createJwt(sub, payload)
        });
      })
      .catch(next);
  })

  .post((req, res, next) => {});

module.exports = userRouter;
