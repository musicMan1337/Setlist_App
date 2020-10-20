"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./libs/logger"));
const config_1 = require("./config");
const db = knex_1.default({
    client: 'pg',
    connection: config_1.DATABASE_URL
});
app_1.default.set('db', db);
app_1.default.listen(config_1.PORT, () => {
    logger_1.default.http(`Server listening at http://localhost:${config_1.PORT}/setapp/v1`);
});
//# sourceMappingURL=server.js.map