const SongsService = require('./songs.service');
const { validate, Router, jsonBodyParser } = require('../../middlewares');

const songsRouter = Router();

songsRouter
  .route('/')
  .all(jsonBodyParser)
  .get((req, res, next) =>
    SongsService.getAllSongs(req.app.get('db'))
      .then((songs) => res.json(SongsService.serializeSongs(songs)))
      .catch(next)
  )

  .post(validate.songBody, (req, res, next) =>
    SongsService.createSong(req.app.get('db'), res.newSong)
      .then((song) => res.status(201).json(SongsService.serializeSong(song)))
      .catch(next)
  );

songsRouter
  .route('/:id')
  .all(jsonBodyParser, (req, res, next) => {
    try {
      const song = SongsService.getById(req.app.get('db'), req.body.song_id);

      if (!song) return res.status(404).json({ message: `Song doesn't exist` });
      res.song = song;
    } catch (error) {
      next(error);
    }

    return next();
  })
  .get((_, res) => res.json(SongsService.serializeSong(res.song)))

  .delete((req, res) =>
    SongsService.deleteById(req.app.get('db'), res.song.id).then(() =>
      res.json({ message: `Song "${res.song.song_name}" deleted` })
    )
  )

  .patch(validate.songBody, (req, res) =>
    SongsService.updateSong(
      req.app.get('db'),
      res.song.id,
      res.newSong
    ).then(() => res.json({ message: `Song "${res.song.song_name}" deleted` }))
  );

module.exports = songsRouter;
