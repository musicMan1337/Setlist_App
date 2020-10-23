import { RequestHandler } from 'express';

import { USERS_TABLE } from '../constants/table.constants';
import { CRUDService } from '../services';
import { auth, validate, Router, jsonBodyParser } from '../middlewares';

const usersRouter = Router();

const getUserMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const dbUser = await CRUDService.getByName(
      req.app.get('db'),
      res.loginUser.user_name
    );

    if (!dbUser) return res.status(400).json({ error: `Incorrect 'User Name'` });

    res.dbUser = dbUser;
    next();
  } catch (error) {
    next(error);
  }
};

usersRouter.use(jsonBodyParser);

usersRouter
  .route('/login')
  .get(auth.requireAuth, (_req, res) =>
    res.status(200).json({ username: res.user.user_name })
  )

  .post(validate.loginBody, getUserMiddleware, auth.passwordCheck);

usersRouter
  .route('/register')
  .post(validate.loginBody, auth.hashPassword, async (req, res, next) => {
    try {
      const [newUser] = await CRUDService.createEntry(
        req.app.get('db'),
        USERS_TABLE,
        res.loginUser
      );

      const { user_name, id } = newUser;
      const token = auth.createJwtService(user_name, id);

      res.status(201).json({ authToken: token, user_name });
    } catch (error) {
      next(error);
    }
  });

usersRouter.route('/delete').delete(auth.requireAuth, async (req, res, next) => {
  try {
    await CRUDService.deleteById(req.app.get('db'), USERS_TABLE, res.user.id);

    res.status(201).json({ message: `Successfully deleted` });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
