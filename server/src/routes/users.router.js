const CRUDService = require('../../src/services/crud.service');
const {
  auth,
  validate,
  Router,
  jsonBodyParser
} = require('../../src/middlewares');

const userRouter = Router();
const TABLE_NAME = 'users';

const getUserMiddleware = (req, res, next) =>
  CRUDService.getByName(req.app.get('db'), res.loginUser.user_name)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(400).json({ error: `Incorrect 'User Name'` });
      }

      res.dbUser = dbUser;
      return next();
    })
    .catch(next);

userRouter.all(jsonBodyParser, validate.loginBody);

userRouter.route('/login').post(getUserMiddleware, auth.passwordCheck);

userRouter.route('/register').post(auth.hashPassword, (req, res, next) => {
  CRUDService.createEntry(req.app.get('db'), TABLE_NAME, res.loginUser)
    .then(([newUser]) => {
      const { user_name, id } = newUser;

      const token = auth.createJwtService(user_name, id);

      res.user_name = user_name;
      return token;
    })
    .then((token) =>
      res.status(201).json({ authToken: token, user_name: res.user_name })
    )
    .catch(next);
});

userRouter.route('/delete').delete(getUserMiddleware, (req, res) =>
  CRUDService.deleteById(req.app.get('db'), TABLE_NAME, res.dbUser.id).then(() => {
    const { user_name } = res.dbUser;

    res.status(204).json({ message: `User "${user_name}" deleted` });
  })
);

module.exports = userRouter;
