"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const morganOption = config_1.NODE_ENV === 'production' ? 'tiny' : 'dev';
const morganSkip = { skip: () => config_1.NODE_ENV === 'test' };
const corsOrigin = {
    origin: config_1.NODE_ENV === 'production' ? config_1.CORS_ORIGIN_PROD : config_1.CORS_ORIGIN_DEV
};
middlewares_1.app.use(morgan_1.default(morganOption, morganSkip));
middlewares_1.app.use(cors_1.default(corsOrigin));
middlewares_1.app.use(helmet_1.default());
middlewares_1.app.get('/', (_req, res) => {
    res.send('Express boilerplate initialized!');
});
middlewares_1.app.use('/setapp/v1/users', routes_1.usersRouter);
middlewares_1.app.use('/setapp/v1/songs', routes_1.songsRouter);
middlewares_1.app.use('/setapp/v1/songs_sets', routes_1.songsSetsRouter);
middlewares_1.app.use('/setapp/v1/sets', routes_1.setsRouter);
middlewares_1.app.use('/setapp/v1/gigs', routes_1.gigsRouter);
middlewares_1.app.use(middlewares_1.error.notFound);
middlewares_1.app.use(middlewares_1.error.errorHandler);
exports.default = middlewares_1.app;
//# sourceMappingURL=app.js.map