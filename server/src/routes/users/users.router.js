const UsersService = require('./users.service');
const { auth, validate, Router, jsonBodyParser } = require('../../middlewares');

const userRouter = Router()

userRouter
  .route('/login')
  .all(jsonBodyParser, validate.loginBody)
  .get((req, res, next) =>
    UsersService.getByName(req.app.get('db'), res.loginUser.user_name)
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(400).json({ error: `Incorrect 'User Name'` });
        }

        res.dbUser = dbUser;
        return next();
      })
      .catch(next)
  )
  .get(auth.passwordCheck)

  .post(auth.hashPassword, (req, res, next) =>
    UsersService.createUser(req.app.get('db'), res.loginUser)
      .then((newUser) => {
        const { user_name, id } = newUser;

        const token = auth.createJwtService(user_name, id);
        return token;
      })
      .then((token) => res.json({ authToken: token }))
      .catch(next)
  );

module.exports = userRouter;
