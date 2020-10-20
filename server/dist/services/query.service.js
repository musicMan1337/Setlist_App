"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("../constants/table.constants");
const QueryService = {
    getSetSongTitles(db, set_id) {
        return db(`${table_constants_1.SONGS_TABLE} as s`)
            .select('id', 'song_title')
            .join(`${table_constants_1.SONGS_SETS_TABLE} as sst`, 'sst.song_id', 's.id')
            .where({ set_id });
    },
    getGigSetsTitles(db, gig_id) {
        return db(`${table_constants_1.SETS_TABLE} as s`)
            .select('id', 'set_name')
            .join(`${table_constants_1.SETS_GIGS_TABLE} as sgt`, 'sgt.set_id', 's.id')
            .where({ gig_id });
    }
};
exports.default = QueryService;
//# sourceMappingURL=query.service.js.map