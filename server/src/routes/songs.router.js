const { validate, Router, jsonBodyParser } = require('../../src/middlewares');
const { CRUDService, SerializeService } = require('../../src/services');
const { SONGS_TABLE } = require('../../src/constants/table.constants');

const songsRouter = Router();

songsRouter.all(jsonBodyParser);

songsRouter
  .route('/')
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), SONGS_TABLE)
      .then((songs) =>
        res.json(SerializeService.serializeData(SONGS_TABLE, songs))
      )
      .catch(next)
  )

  .post(validate.songBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), SONGS_TABLE, res.newSong)
      .then(([song]) => res.status(201).json(SerializeService.serializeSong(song)))
      .catch(next)
  );

songsRouter
  .route('/:id')
  .all((req, res, next) => {
    CRUDService.getById(req.app.get('db'), SONGS_TABLE, req.params.id)
      .then((song) => {
        if (!song) return res.status(404).json({ message: `Song doesn't exist` });
        res.song = song;
        return next()
      })
      .catch(next);
  })

  .get((_req, res) => res.json(SerializeService.serializeSong(res.song)))

  .delete((req, res) =>
    CRUDService.deleteById(req.app.get('db'), SONGS_TABLE, res.song.id).then(
      () => {
        const { song_name } = res.song;

        res.status(204).json({ message: `Song "${song_name}" deleted` });
      }
    )
  )

  .patch(validate.songBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      SONGS_TABLE,
      res.song.id,
      res.newSong
    ).then(([song]) => res.status(201).json(song))
  );

module.exports = songsRouter;
