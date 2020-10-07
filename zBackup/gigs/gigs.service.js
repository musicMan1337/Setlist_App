const xss = require('xss');

const GigsService = {
  getAllGigs(db) {
    return db('gigs').select('*');
  },

  getById(db, id) {
    return db('gigs').where({ id }).first();
  },

  deleteById(db, id) {
    return db('gigs').where({ id }).del();
  },

  createGig(db, newGig) {
    return db('gigs').insert(newGig, '*');
  },

  updateGig(db, id, newGig) {
    return db('gigs').where({ id }).update(newGig, '*');
  },

  serializeGig(gig) {
    return {
      gig_name: xss(gig.gig_name),
      venue: xss(gig.venue),
      gig_date: gig.gig_date,
      start_time: gig.start_time,
      end_time: gig.end_time,
      user_id: gig.user_id
    };
  },

  serializeGigs(gigs) {
    return gigs.map(this.serializeSong);
  }
};

module.exports = GigsService;
