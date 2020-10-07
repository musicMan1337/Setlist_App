const { CRUDService, SerializeService } = require('../../src/services');
const {
  validate,
  Router,
  jsonBodyParser
} = require('../../src/middlewares');

const setsRouter = Router();
const TABLE_NAME = 'sets';

setsRouter
  .route('/')
  .all(jsonBodyParser)
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), TABLE_NAME)
      .then((sets) => res.json(SerializeService.serializeData(TABLE_NAME, sets)))
      .catch(next)
  )

  .post(validate.setBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), TABLE_NAME, res.newset)
      .then((set) => res.status(201).json(SerializeService.serializeSet(set)))
      .catch(next)
  );

setsRouter
  .route('/:id')
  .all(jsonBodyParser, (req, res, next) => {
    try {
      const set = CRUDService.getById(
        req.app.get('db'),
        TABLE_NAME,
        req.body.set_id
      );

      if (!set) return res.status(404).json({ message: `set doesn't exist` });
      res.set = set;
    } catch (error) {
      next(error);
    }

    return next();
  })
  .get((_, res) => res.json(SerializeService.serializeSet(res.set)))

  .delete((req, res) =>
    CRUDService.deleteById(req.app.get('db'), TABLE_NAME, res.set.id).then(() =>
      res.json({ message: `set "${res.set.set_name}" deleted` })
    )
  )

  .patch(validate.setBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      TABLE_NAME,
      res.set.id,
      res.newset
    ).then(() => res.json({ message: `Set "${res.set.set_name}" deleted` }))
  );

module.exports = setsRouter;
