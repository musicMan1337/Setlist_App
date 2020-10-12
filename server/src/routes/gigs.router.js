const { validate, Router, jsonBodyParser } = require('../../src/middlewares');
const { GIGS_TABLE } = require('../../src/constants/table.constants');
const {
  CRUDService,
  QueryService,
  SerializeService
} = require('../../src/services');

const gigsRouter = Router();

gigsRouter.all(jsonBodyParser);

gigsRouter
  .route('/')
  .get((req, res, next) =>
    CRUDService.getAllData(req.app.get('db'), GIGS_TABLE)
      .then((gigs) => res.json(SerializeService.serializeData(GIGS_TABLE, gigs)))
      .catch(next)
  )

  .post(validate.gigBody, (req, res, next) =>
    CRUDService.createEntry(req.app.get('db'), GIGS_TABLE, res.newgig)
      .then((gig) => res.status(201).json(CRUDService.serializeGig(gig)))
      .catch(next)
  );

gigsRouter
  .route('/:id')
  .all((req, res, next) => {
    CRUDService.getById(req.app.get('db'), GIGS_TABLE, req.params.id)
      .then((gig) => {
        if (!gig) return res.status(404).json({ message: `Gig doesn't exist` });
        res.gig = gig;
        return next()
      })
      .catch(next);
  })

  .get((_req, res) => res.json(SerializeService.serializeGig(res.gig)))

  .delete((req, res) =>
    CRUDService.deleteById(req.app.get('db'), GIGS_TABLE, res.gig.id).then(() => {
      const { gig_name } = res.gig;

      res.status(204).json({ message: `Gig "${gig_name}" deleted` });
    })
  )

  .patch(validate.gigBody, (req, res) =>
    CRUDService.updateEntry(
      req.app.get('db'),
      GIGS_TABLE,
      res.gig.id,
      res.newgig
    ).then(([gig]) => res.status(201).json(gig))
  );

module.exports = gigsRouter;
