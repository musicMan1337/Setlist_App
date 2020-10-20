import { GIGS_TABLE } from '../constants/table.constants';
import { auth, validate, Router, jsonBodyParser } from '../middlewares';
import { CRUDService, QueryService, SerializeService } from '../services';

const gigsRouter = Router();

gigsRouter.use(jsonBodyParser, auth.requireAuth);

gigsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const emptyGigs: Express.Gig[] = await CRUDService.getAllData(
        req.app.get('db'),
        GIGS_TABLE,
        res.user.id
      );

      if (emptyGigs.length === 0) {
        res.status(502).json([]);
        return;
      }

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
        halfGigs.map(async (gig) => {
          gig.sets = await Promise.all(
            gig.sets.map(async (set) => {
              set.songs = await QueryService.getSetSongTitles(
                req.app.get('db'),
                set.id
              );
              return set;
            })
          );
          return gig;
        })
      );

      res.json(SerializeService.serializeData(GIGS_TABLE, fullGigs));
    } catch (error) {
      next(error);
    }
  })

  .post(validate.gigBody, async (req, res, next) => {
    try {
      res.newGig.user_id = res.user.id;

      const [gig] = await CRUDService.createEntry(
        req.app.get('db'),
        GIGS_TABLE,
        res.newGig
      );

      res.status(201).json(SerializeService.serializeGig(gig));
    } catch (error) {
      next(error);
    }
  });

gigsRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const gig: Express.Gig = await CRUDService.getById(
        req.app.get('db'),
        GIGS_TABLE,
        Number(req.params.id),
        res.user.id
      );

      if (!gig) return res.status(404).json({ message: 'Data not found' });

      gig.sets = await QueryService.getGigSetsTitles(req.app.get('db'), gig.id);

      gig.sets = await Promise.all(
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

  .get((_req, res) => res.status(200).json(SerializeService.serializeGig(res.gig)))

  .patch(validate.gigBody, async (req, res) => {
    const [gig] = await CRUDService.updateEntry(
      req.app.get('db'),
      GIGS_TABLE,
      res.gig.id,
      res.user.id,
      res.newGig
    );

    res.status(201).json(SerializeService.serializeGig(gig));
  })

  .delete(async (req, res) => {
    await CRUDService.deleteById(req.app.get('db'), GIGS_TABLE, res.gig.id);

    res.status(201).json({ message: `Successfully deleted` });
  });

export default gigsRouter;
