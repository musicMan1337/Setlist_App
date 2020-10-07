const xss = require('xss');

const SongsService = {
  getAllSongs(db) {
    return db('songs').select('*');
  },

  getById(db, id) {
    return db('songs').where({ id }).first();
  },

  deleteById(db, id) {
    return db('songs').where({ id }).del();
  },

  createSong(db, newSong) {
    return db('songs').insert(newSong, '*');
  },

  updateSong(db, id, newSong) {
    return db('songs').where({ id }).update(newSong, '*');
  },

  serializeSong(song) {
    return {
      song_title: xss(song.song_title),
      composer: xss(song.composer),
      arranger: xss(song.arranger),
      description: xss(song.description),
      user_id: song.user_id
    };
  },

  serializeSongs(songs) {
    return songs.map(this.serializeSong);
  }
};

module.exports = SongsService;
