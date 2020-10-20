"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_DB_URL = exports.DATABASE_URL = exports.SALT_ROUNDS = exports.JWT_SECRET = exports.API_TOKEN = exports.CORS_ORIGIN_PROD = exports.CORS_ORIGIN_DEV = exports.NODE_ENV = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = Number(process.env.PORT) || 8000;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.CORS_ORIGIN_DEV = process.env.CORS_ORIGIN_DEV || '';
exports.CORS_ORIGIN_PROD = process.env.CORS_ORIGIN_PROD || '';
exports.API_TOKEN = process.env.API_TOKEN || '';
exports.JWT_SECRET = process.env.JWT_SECRET || '';
exports.SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
exports.DATABASE_URL = process.env.DATABASE_URL || '';
exports.TEST_DB_URL = process.env.TEST_DB_URL || '';
//# sourceMappingURL=config.js.map