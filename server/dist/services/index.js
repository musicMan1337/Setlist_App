"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeService = exports.QueryService = exports.CRUDService = void 0;
var crud_service_1 = require("./crud.service");
Object.defineProperty(exports, "CRUDService", { enumerable: true, get: function () { return __importDefault(crud_service_1).default; } });
var query_service_1 = require("./query.service");
Object.defineProperty(exports, "QueryService", { enumerable: true, get: function () { return __importDefault(query_service_1).default; } });
var serialize_service_1 = require("./serialize.service");
Object.defineProperty(exports, "SerializeService", { enumerable: true, get: function () { return __importDefault(serialize_service_1).default; } });
//# sourceMappingURL=index.js.map