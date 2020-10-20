"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("../constants/table.constants");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const userRouter = middlewares_1.Router();
const getUserMiddleware = async (req, res, next) => {
    try {
        const dbUser = await services_1.CRUDService.getByName(req.app.get('db'), res.loginUser.user_name);
        if (!dbUser) {
            return res.status(400).json({ error: `Incorrect 'User Name'` });
        }
        res.dbUser = dbUser;
    }
    catch (error) {
        next(error);
    }
    return next();
};
userRouter.use(middlewares_1.jsonBodyParser);
userRouter
    .route('/login')
    .get(middlewares_1.auth.requireAuth, (_req, res) => res.status(200).json({ username: res.user.user_name }))
    .post(middlewares_1.validate.loginBody, getUserMiddleware, middlewares_1.auth.passwordCheck);
userRouter
    .route('/register')
    .post(middlewares_1.validate.loginBody, middlewares_1.auth.hashPassword, async (req, res, next) => {
    try {
        const [newUser] = await services_1.CRUDService.createEntry(req.app.get('db'), table_constants_1.USERS_TABLE, res.loginUser);
        const { user_name, id } = newUser;
        const token = middlewares_1.auth.createJwtService(user_name, id);
        res.status(201).json({ authToken: token, user_name });
    }
    catch (error) {
        next(error);
    }
});
userRouter.route('/delete').delete(middlewares_1.auth.requireAuth, async (req, res, next) => {
    try {
        await services_1.CRUDService.deleteById(req.app.get('db'), table_constants_1.USERS_TABLE, res.user.id);
        res.status(201).json({ message: `Successfully deleted` });
    }
    catch (error) {
        next(error);
    }
});
exports.default = userRouter;
//# sourceMappingURL=users.router.js.map