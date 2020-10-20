import xss from 'xss';

const SerializeService = {
  // serialize submissions...
  body: {
    user(user: Express.NewUser) {
      return {
        id: user.id || null,
        user_name: xss(user.user_name),
        password: xss(user.password)
      };
    },

    song(song: Express.NewSong) {
      return {
        id: song.id || null,
        song_title: xss(song.song_title),
        composer: xss(song.composer),
        arranger: xss(song.arranger),
        description: xss(song.description)
      };
    },

    set(set: Express.NewSetList) {
      return {
        id: set.id || null,
        set_name: xss(set.set_name),
        description: xss(set.description)
      };
    },

    gig(gig: Express.NewGig) {
      return {
        id: gig.id || null,
        venue: xss(gig.venue),
        gig_date: gig.gig_date,
        start_time: gig.start_time,
        end_time: gig.end_time
      };
    }
  },

  // serialize fetched data...
  serializeSong(song: Express.Song) {
    return {
      id: song.id,
      song_title: xss(song.song_title),
      composer: xss(song.composer),
      arranger: xss(song.arranger),
      description: xss(song.description)
    };
  },

  serializeSet(set: Express.SetList) {
    return {
      id: set.id,
      set_name: xss(set.set_name),
      description: xss(set.description),
      songs: set.songs.map((song) => ({
        id: song.id,
        song_title: xss(song.song_title)
      }))
    };
  },

  serializeGig(gig: Express.Gig) {
    return {
      id: gig.id,
      venue: xss(gig.venue),
      gig_date: gig.gig_date,
      start_time: gig.start_time,
      end_time: gig.end_time,
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

  // Routes can pipe multiple entries for seralization
  serializeData(table: string, data: any[]) {
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

export default SerializeService;
