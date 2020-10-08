const { CRUDService, SerializeService } = require('../../src/services');
const { validate, Router, jsonBodyParser } = require('../../src/middlewares');

const songsRouter = Router();
const TABLE_NAME = 'songs';

songsRouter
  .route('/')
  .all(jsonBodyParser)
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), TABLE_NAME)
      .then((songs) =>
        res.json(SerializeService.serializeData(TABLE_NAME, songs))
      )
      .catch(next)
  )

  .post(validate.songBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), TABLE_NAME, res.newSong)
      .then((song) =>
        res.status(201).json(SerializeService.serializeSong(song))
      )
      .catch(next)
  );

songsRouter
  .route('/:id')
  .all(jsonBodyParser, (req, res, next) => {
    try {
      const song = CRUDService.getById(
        req.app.get('db'),
        TABLE_NAME,
        req.body.song_id
      );

      if (!song) return res.status(404).json({ message: `Song doesn't exist` });
      res.song = song;
    } catch (error) {
      next(error);
    }

    return next();
  })
  .get((_, res) => res.json(SerializeService.serializeSong(res.song)))

  .delete((req, res) =>
    CRUDService.deleteById(
      req.app.get('db'),
      TABLE_NAME,
      res.song.id
    ).then(() =>
      res.status(204).json({ message: `Song "${res.song.song_name}" deleted` })
    )
  )

  .patch(validate.songBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      TABLE_NAME,
      res.song.id,
      res.newSong
    ).then(() => res.json({ message: `Song "${res.song.song_name}" deleted` }))
  );

module.exports = songsRouter;
