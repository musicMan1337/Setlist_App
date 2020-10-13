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
  .get(async (req, res, next) => {
    try {
      const emptyGigs = await CRUDService.getAllData(
        req.app.get('db'),
        GIGS_TABLE
      );

      // get sets assigned to gigs
      const halfGigs = await Promise.all(
        emptyGigs.map(async (gig) => {
          gig.sets = await QueryService.getGigSetsTitles(
            req.app.get('db'),
            gig.id
          );
          return gig;
        })
      );

      // get songs assigned to sets
      const fullGigs = await Promise.all(
        halfGigs.sets.map(async (set) => {
          set.songs = await QueryService.getSetSongTitles(
            req.app.get('db'),
            set.id
          );
          return set;
        })
      );

      res.json(SerializeService.serializeData(GIGS_TABLE, fullGigs));
    } catch (error) {
      next(error);
    }
  })

  .post(validate.gigBody, async (req, res, next) => {
    try {
      const gig = await CRUDService.createEntry(
        req.app.get('db'),
        GIGS_TABLE,
        res.newgig
      );

      res.status(201).json(CRUDService.serializeGig(gig));
    } catch (error) {
      next(error);
    }
  });

gigsRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const gig = await CRUDService.getById(
        req.app.get('db'),
        GIGS_TABLE,
        req.params.id
      );

      if (!gig) return res.status(404).json({ message: `Gig doesn't exist` });

      gig.sets = await QueryService.getGigSetsTitles(req.app.get('db'), gig.id);

      gig.sets.songs = await Promise.all(
        gig.sets.map(async (set) => {
          set.songs = await QueryService.getSetSongTitles(
            req.app.get('db'),
            set.id
          );
          return set;
        })
      );

      res.gig = gig;
    } catch (error) {
      next(error);
    }
    return next();
  })

  .get((_req, res) => res.json(SerializeService.serializeGig(res.gig)))

  .delete(async (req, res) => {
    await CRUDService.deleteById(req.app.get('db'), GIGS_TABLE, res.gig.id);

    const { gig_name } = res.gig;
    res.status(204).json({ message: `Gig "${gig_name}" deleted` });
  })

  .patch(validate.gigBody, async (req, res) => {
    const [gig] = await CRUDService.updateEntry(
      req.app.get('db'),
      GIGS_TABLE,
      res.gig.id,
      res.newgig
    );

    res.status(201).json(gig);
  });

module.exports = gigsRouter;
