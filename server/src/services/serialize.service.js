const xss = require('xss');

const SerializeService = {
  serializeSong(song) {
    return {
      id: song.id,
      song_title: xss(song.song_title),
      composer: xss(song.composer),
      arranger: xss(song.arranger),
      description: xss(song.description),
      user_id: song.user_id
    };
  },

  serializeSet(set) {
    return {
      id: set.id,
      set_name: xss(set.set_name),
      description: xss(set.description),
      user_id: set.user_id,
      songs: set.songs.map((song) => ({
        id: song.id,
        song_title: xss(song.song_title)
      }))
    };
  },

  serializeGig(gig) {
    return {
      id: gig.id,
      venue: xss(gig.venue),
      gig_date: gig.gig_date,
      start_time: gig.start_time,
      end_time: gig.end_time,
      user_id: gig.user_id,
      sets: gig.sets.map((set) => ({
        id: set.id,
        set_name: xss(set.set_name),
        songs: set.songs.map((song) => ({
          id: song.id,
          song_title: xss(song.song_title)
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

module.exports = SerializeService;
