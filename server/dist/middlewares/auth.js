"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crud_service_1 = __importDefault(require("../services/crud.service"));
const config_1 = require("../config");
const createJwtService = (user_name, id) => {
    const subject = user_name;
    const payload = { user_id: id };
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, {
        subject,
        algorithm: 'HS256'
    });
};
const passwordCheck = async (req, res, next) => {
    try {
        const plaintextPassword = req.body.password;
        const { password, user_name, id } = res.dbUser;
        const passwordsMatch = await bcryptjs_1.default.compare(plaintextPassword, password);
        if (!passwordsMatch)
            return res.status(401).json({ error: 'Unauthorized request' });
        let token;
        if (id)
            token = createJwtService(user_name, id);
        res.status(200).json({ authToken: token, user_name });
    }
    catch (error) {
        next(error);
    }
};
const hashPassword = async (_req, res, next) => {
    try {
        const { password } = res.loginUser;
        const hash = await bcryptjs_1.default.hash(password, config_1.SALT_ROUNDS);
        res.loginUser.password = hash;
        next();
    }
    catch (error) {
        next(error);
    }
};
const requireAuth = async (req, res, next) => {
    const authToken = req.get('Authorization') || '';
    if (!authToken.toLowerCase().startsWith('bearer '))
        return res.status(401).json({ error: 'Missing bearer token' });
    const token = authToken.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET, {
            algorithms: ['HS256']
        });
        const user = await crud_service_1.default.getByName(req.app.get('db'), payload.sub);
        if (!user)
            return res.status(404).json({ message: 'Data not found' });
        res.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = { createJwtService, passwordCheck, hashPassword, requireAuth };
//# sourceMappingURL=auth.js.map