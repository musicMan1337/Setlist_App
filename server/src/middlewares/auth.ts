import { RequestHandler } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import CRUDService from '../services/crud.service';

import { JWT_SECRET, SALT_ROUNDS } from '../config';

const createJwtService = (user_name: string, id: number): String => {
  const subject = user_name;
  const payload = { user_id: id };

  return jwt.sign(payload, JWT_SECRET, {
    subject,
    algorithm: 'HS256'
  });
};

const passwordCheck: RequestHandler = async (req, res, next) => {
  try {
    const plaintextPassword = req.body.password;
    const { password, user_name, id } = res.dbUser;

    const passwordsMatch = await bcrypt.compare(plaintextPassword, password);

    if (!passwordsMatch)
      return res.status(401).json({ error: 'Unauthorized request' });

    let token;
    if (id) token = createJwtService(user_name, id);

    res.status(200).json({ authToken: token, user_name });
  } catch (error) {
    next(error);
  }
};

const hashPassword: RequestHandler = async (_req, res, next) => {
  try {
    const { password } = res.loginUser;

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    res.loginUser.password = hash;
    next();
  } catch (error) {
    next(error);
  }
};

const requireAuth: RequestHandler = async (req, res, next) => {
  const authToken = req.get('Authorization') || '';

  if (!authToken.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'Missing bearer token' });

  const token = authToken.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256']
    });

    const user = await CRUDService.getByName(req.app.get('db'), payload.sub);

    if (!user) return res.status(404).json({ message: 'Data not found' });

    res.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default { createJwtService, passwordCheck, hashPassword, requireAuth };
