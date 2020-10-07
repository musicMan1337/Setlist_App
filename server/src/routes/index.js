/*
|--------------------------------------------------------------------------
| BARREL EXPORT FILE
|--------------------------------------------------------------------------
| How-To barrel-export components:
| const thingsRouter = require('./things/thingsRouter')
|
| module.exports = {
|   thingsRouter
| }
|
| Why? Readability:
| const { thingsRouter, stuffRouter, userRouter } = require('./routes')
*/
const usersRouter = require('./users/users.router');
const songsRouter = require('./songs/songs.router');
const setsRouter = require('./sets/sets.router');
const gigsRouter = require('./gigs/gigs.router');

module.exports = {
  usersRouter,
  songsRouter,
  setsRouter,
  gigsRouter
};
