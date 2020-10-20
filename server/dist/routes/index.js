"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gigsRouter = exports.setsRouter = exports.songsSetsRouter = exports.songsRouter = exports.usersRouter = void 0;
var users_router_1 = require("./users.router");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return __importDefault(users_router_1).default; } });
var songs_router_1 = require("./songs.router");
Object.defineProperty(exports, "songsRouter", { enumerable: true, get: function () { return __importDefault(songs_router_1).default; } });
var songs_sets_router_1 = require("./songs_sets.router");
Object.defineProperty(exports, "songsSetsRouter", { enumerable: true, get: function () { return __importDefault(songs_sets_router_1).default; } });
var sets_router_1 = require("./sets.router");
Object.defineProperty(exports, "setsRouter", { enumerable: true, get: function () { return __importDefault(sets_router_1).default; } });
var gigs_router_1 = require("./gigs.router");
Object.defineProperty(exports, "gigsRouter", { enumerable: true, get: function () { return __importDefault(gigs_router_1).default; } });
//# sourceMappingURL=index.js.map