const { validate, Router, jsonBodyParser } = require('../../src/middlewares');
const { SETS_TABLE } = require('../../src/constants/table.constants');
const {
  CRUDService,
  SerializeService,
  QueryService
} = require('../../src/services');

const setsRouter = Router();

setsRouter.all(jsonBodyParser);

setsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const emptySets = await CRUDService.getAllData(
        req.app.get('db'),
        SETS_TABLE
      );

      const fullSets = await Promise.all(
        emptySets.map(async (set) => {
          set.songs = await QueryService.getSetSongTitles(
            req.app.get('db'),
            set.id
          );
          return set;
        })
      );

      res.json(SerializeService.serializeData(SETS_TABLE, fullSets));
    } catch (error) {
      next(error);
    }
  })

  .post(validate.setBody, async (req, res, next) => {
    try {
      const set = await CRUDService.createEntry(
        req.app.get('db'),
        SETS_TABLE,
        res.newset
      );

      res.status(201).json(SerializeService.serializeSet(set));
    } catch (error) {
      next(error);
    }
  });

setsRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const set = await CRUDService.getById(
        req.app.get('db'),
        SETS_TABLE,
        req.params.id
      );
      if (!set) return res.status(404).json({ message: `Set doesn't exist` });

      set.songs = await QueryService.getSetSongTitles(
        req.app.get('db'),
        set.id
      );

      res.setList = set;
    } catch (error) {
      next(error);
    }

    return next();
  })

  .get((_req, res) => res.json(SerializeService.serializeSet(res.setList)))

  .delete(async (req, res) => {
    await CRUDService.deleteById(req.app.get('db'), SETS_TABLE, res.set.id);

    const { set_name } = res.set;
    res.status(204).json({ message: `Set "${set_name}" deleted` });
  })

  .patch(validate.setBody, async (req, res) => {
    const [set] = await CRUDService.updateEntry(
      req.app.get('db'),
      SETS_TABLE,
      res.set.id,
      res.newset
    );

    res.status(201).json(set);
  });

module.exports = setsRouter;
