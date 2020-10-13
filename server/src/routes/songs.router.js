const { validate, Router, jsonBodyParser } = require('../../src/middlewares');
const { CRUDService, SerializeService } = require('../../src/services');
const { SONGS_TABLE } = require('../../src/constants/table.constants');

const songsRouter = Router();

songsRouter.all(jsonBodyParser);

songsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const songs = await CRUDService.getAllData(req.app.get('db'), SONGS_TABLE);
      res.json(SerializeService.serializeData(SONGS_TABLE, songs));
    } catch (error) {
      next(error);
    }
  })

  .post(validate.songBody, async (req, res, next) => {
    try {
      const [song] = await CRUDService.createEntry(
        req.app.get('db'),
        SONGS_TABLE,
        res.newSong
      );
      res.status(201).json(SerializeService.serializeSong(song));
    } catch (error) {
      next(error);
    }
  });

songsRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const song = await CRUDService.getById(
        req.app.get('db'),
        SONGS_TABLE,
        req.params.id
      );

      if (!song) return res.status(404).json({ message: `Song doesn't exist` });

      res.song = song;
    } catch (error) {
      next(error);
    }

    return next();
  })

  .get((_req, res) => res.json(SerializeService.serializeSong(res.song)))

  .delete(async (req, res) => {
    await CRUDService.deleteById(req.app.get('db'), SONGS_TABLE, res.song.id);

    const { song_name } = res.song;
    res.status(204).json({ message: `Song "${song_name}" deleted` });
  })

  .patch(validate.songBody, async (req, res) => {
    const [song] = await CRUDService.updateEntry(
      req.app.get('db'),
      SONGS_TABLE,
      res.song.id,
      res.newSong
    );

    res.status(201).json(song);
  });

module.exports = songsRouter;
