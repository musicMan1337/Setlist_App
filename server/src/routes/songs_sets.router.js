const { validate, Router, jsonBodyParser } = require('../middlewares');
const { CRUDService } = require('../services');
const { SONGS_SETS_TABLE } = require('../constants/table.constants');

const songsSetsRouter = Router();

songsSetsRouter.all(jsonBodyParser);

songsSetsRouter
  .route('/')
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), SONGS_SETS_TABLE)
      .then((linkages) => res.json(linkages))
      .catch(next)
  )

  .post(validate.songSetBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), SONGS_SETS_TABLE, res.newLinkage)
      .then(([newLinkage]) => res.status(201).json({ linkage: newLinkage }))
      .catch(next)
  );

module.exports = songsSetsRouter;
