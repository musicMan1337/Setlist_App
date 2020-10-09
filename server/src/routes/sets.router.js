const { CRUDService, SerializeService } = require('../../src/services');
const { validate, Router, jsonBodyParser } = require('../../src/middlewares');

const setsRouter = Router();
const TABLE_NAME = 'sets';

setsRouter.all(jsonBodyParser);

setsRouter
  .route('/')
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
  .all((req, res, next) => {
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

  .get((_req, res) => res.json(SerializeService.serializeSet(res.set)))

  .delete((req, res) =>
    CRUDService.deleteById(req.app.get('db'), TABLE_NAME, res.set.id).then(() => {
      const { set_name } = res.set;

      res.status(204).json({ message: `Set "${set_name}" deleted` });
    })
  )

  .patch(validate.setBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      TABLE_NAME,
      res.set.id,
      res.newset
    ).then(([set]) => res.status(201).json(set))
  );

module.exports = setsRouter;
