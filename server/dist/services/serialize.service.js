"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xss_1 = __importDefault(require("xss"));
const SerializeService = {
    body: {
        user(user) {
            return {
                id: user.id || null,
                user_name: xss_1.default(user.user_name),
                password: xss_1.default(user.password)
            };
        },
        song(song) {
            return {
                id: song.id || null,
                song_title: xss_1.default(song.song_title),
                composer: xss_1.default(song.composer),
                arranger: xss_1.default(song.arranger),
                description: xss_1.default(song.description)
            };
        },
        set(set) {
            return {
                id: set.id || null,
                set_name: xss_1.default(set.set_name),
                description: xss_1.default(set.description)
            };
        },
        gig(gig) {
            return {
                id: gig.id || null,
                venue: xss_1.default(gig.venue),
                gig_date: gig.gig_date,
                start_time: gig.start_time,
                end_time: gig.end_time
            };
        }
    },
    serializeSong(song) {
        return {
            id: song.id,
            song_title: xss_1.default(song.song_title),
            composer: xss_1.default(song.composer),
            arranger: xss_1.default(song.arranger),
            description: xss_1.default(song.description)
        };
    },
    serializeSet(set) {
        return {
            id: set.id,
            set_name: xss_1.default(set.set_name),
            description: xss_1.default(set.description),
            songs: set.songs.map((song) => ({
                id: song.id,
                song_title: xss_1.default(song.song_title)
            }))
        };
    },
    serializeGig(gig) {
        return {
            id: gig.id,
            venue: xss_1.default(gig.venue),
            gig_date: gig.gig_date,
            start_time: gig.start_time,
            end_time: gig.end_time,
            sets: gig.sets.map((set) => ({
                id: set.id,
                set_name: xss_1.default(set.set_name),
                songs: set.songs.map((song) => ({
                    id: song.id,
                    song_title: xss_1.default(song.song_title)
                }))
            }))
        };
    },
    serializeData(table, data) {
        switch (table) {
            case 'songs':
                return data.map(this.serializeSong);
            case 'sets':
                return data.map(this.serializeSet);
            case 'gigs':
                return data.map(this.serializeGig);
            default:
                return { message: 'Serialization failed' };
        }
    }
};
exports.default = SerializeService;
//# sourceMappingURL=serialize.service.js.map