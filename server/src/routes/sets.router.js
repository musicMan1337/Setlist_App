const {
  CRUDService,
  SerializeService,
  QueryService
} = require('../../src/services');
const { validate, Router, jsonBodyParser } = require('../../src/middlewares');
const { SETS_TABLE } = require('../../src/constants/table.constants');

const setsRouter = Router();

setsRouter.all(jsonBodyParser);

setsRouter
  .route('/')
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), SETS_TABLE)
      .then((emptySets) =>
        Promise.all(
          emptySets.map(async (set) => {
            set.songs = await QueryService.getSetSongTitles(
              req.app.get('db'),
              set.id
            );
            return set;
          })
        )
      )
      .then((sets) => res.json(SerializeService.serializeData(SETS_TABLE, sets)))
      .catch(next)
  )

  .post(validate.setBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), SETS_TABLE, res.newset)
      .then((set) => res.status(201).json(SerializeService.serializeSet(set)))
      .catch(next)
  );

setsRouter
  .route('/:id')
  .all((req, res, next) => {
    CRUDService.getById(req.app.get('db'), SETS_TABLE, req.params.id)
      .then((set) => {
        if (!set) return res.status(404).json({ message: `Set doesn't exist` });
        res.setList = set;
        return next();
      })
      .catch(next);
  })

  .get((_req, res) => res.json(SerializeService.serializeSet(res.setList)))

  .delete((req, res) =>
    CRUDService.deleteById(req.app.get('db'), SETS_TABLE, res.set.id).then(() => {
      const { set_name } = res.set;

      res.status(204).json({ message: `Set "${set_name}" deleted` });
    })
  )

  .patch(validate.setBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      SETS_TABLE,
      res.set.id,
      res.newset
    ).then(([set]) => res.status(201).json(set))
  );

module.exports = setsRouter;
