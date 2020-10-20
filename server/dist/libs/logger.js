"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config");
const { format } = winston_1.default;
const fileFormat = format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json());
const consoleFormat = format.combine(format.colorize({ colors: { info: 'blue' } }), format.timestamp({ format: 'HH:mm:ss' }), format.align(), format.printf((info) => `[${info.timestamp}] ❗${info.level}: ${info.message}`));
const logger = winston_1.default.createLogger();
const filename = path_1.default.resolve(__dirname, `logs/winston_logs.log`);
if (config_1.NODE_ENV === 'development') {
    logger.add(new winston_1.default.transports.File({
        filename,
        level: 'http',
        maxsize: 20000000,
        tailable: true,
        zippedArchive: true,
        format: fileFormat
    }));
}
if (config_1.NODE_ENV === 'development') {
    logger.add(new winston_1.default.transports.Console({
        level: 'silly',
        format: consoleFormat
    }));
}
exports.default = logger;
//# sourceMappingURL=logger.js.map