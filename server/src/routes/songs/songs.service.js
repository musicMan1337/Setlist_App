const xss = require('xss')

const SongsService = {
  getAllSongs(db) {},

  getById(db, id) {},

  deleteById(db, id) {},

  createSong(db, newSong) {},

  updateSong(db, id, newSong) {},

  serializeSong(song) {
    return {
      song_title: xss(song.song_title),
      composer: xss(song.composer),
      arranger: xss(song.arranger),
      description: xss(song.description),
      user_id: song.user_id
    }
  },

  serializeSongs(songs) {
    return songs.map(this.serializeSong)
  }
}

module.exports = SongsService