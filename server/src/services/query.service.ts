import Knex from 'knex';

import {
  SONGS_TABLE,
  SONGS_SETS_TABLE,
  SETS_TABLE,
  SETS_GIGS_TABLE
} from '../constants/table.constants';

const QueryService = {
  getSetSongTitles(db: Knex, set_id: number) {
    return db(`${SONGS_TABLE} as s`)
      .select('id', 'song_title')
      .join(`${SONGS_SETS_TABLE} as sst`, 'sst.song_id', 's.id')
      .where({ set_id });
  },

  getGigSetsTitles(db: Knex, gig_id: number) {
    return db(`${SETS_TABLE} as s`)
      .select('id', 'set_name')
      .join(`${SETS_GIGS_TABLE} as sgt`, 'sgt.set_id', 's.id')
      .where({ gig_id });
  }
};

export default QueryService;
