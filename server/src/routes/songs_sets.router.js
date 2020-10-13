const { validate, Router, jsonBodyParser } = require('../middlewares');
const { CRUDService } = require('../services');
const { SONGS_SETS_TABLE } = require('../constants/table.constants');

const songsSetsRouter = Router();

const parseParams = (req, res, next) => {
  const [song_id, set_id] = req.params.id.split('-');

  if (!set_id)
    return res.status(400).json({
      error: `Missing IDs in request params`
    });

  res.song_id = song_id;
  res.set_id = set_id;
  return next();
};

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

songsSetsRouter.route('/:id').delete(parseParams, (req, res) =>
  CRUDService.deleteSSLink(req.app.get('db'), res.song_id, res.set_id).then(() => {
    const { set_name } = res.set;

    res.status(204).json({ message: `Set "${set_name}" deleted` });
  })
);

module.exports = songsSetsRouter;
