const { CRUDService, SerializeService } = require('../../src/services');
const { validate, Router, jsonBodyParser } = require('../../src/middlewares');

const gigsRouter = Router();
const TABLE_NAME = 'gigs';

gigsRouter
  .route('/')
  .all(jsonBodyParser)
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), TABLE_NAME)
      .then((gigs) => res.json(SerializeService.serializeData(TABLE_NAME, gigs)))
      .catch(next)
  )

  .post(validate.gigBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), TABLE_NAME, res.newgig)
      .then((gig) => res.status(201).json(CRUDService.serializeGig(gig)))
      .catch(next)
  );

gigsRouter
  .route('/:id')
  .all(jsonBodyParser, (req, res, next) => {
    try {
      const gig = CRUDService.getById(
        req.app.get('db'),
        TABLE_NAME,
        req.body.gig_id
      );

      if (!gig) return res.status(404).json({ message: `Gig doesn't exist` });

      res.gig = gig;
    } catch (error) {
      next(error);
    }

    return next();
  })

  .get((_req, res) => res.json(SerializeService.serializeGig(res.gig)))

  .delete((req, res) =>
    CRUDService.deleteById(req.app.get('db'), TABLE_NAME, res.gig.id).then(() => {
      const { gig_name } = res.gig;

      res.status(204).json({ message: `Gig "${gig_name}" deleted` });
    })
  )

  .patch(validate.gigBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      TABLE_NAME,
      res.gig.id,
      res.newgig
    ).then(() => res.json({ message: `gig "${res.gig.gig_name}" deleted` }))
  );

module.exports = gigsRouter;
