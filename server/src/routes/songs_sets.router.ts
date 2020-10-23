import { SONGS_SETS_TABLE } from '../constants/table.constants';
import { CRUDService } from '../services';
import { auth, validate, Router, jsonBodyParser } from '../middlewares';

const songsSetsRouter = Router();

const parseParams = (params: string) => {
  const [song_id, set_id] = params.split('-');
  return { song_id, set_id };
};

songsSetsRouter.use(jsonBodyParser, auth.requireAuth);

songsSetsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const linkages = await CRUDService.getAllLinks(
        req.app.get('db'),
        SONGS_SETS_TABLE
      );

      res.status(200).json(linkages);
    } catch (error) {
      next(error);
    }
  })

  .post(validate.songSetBody, async (req, res, next) => {
    try {
      const [linkage] = await CRUDService.createEntry(
        req.app.get('db'),
        SONGS_SETS_TABLE,
        res.songSet
      );

      res.status(201).json({ linkage });
    } catch (error) {
      next(error);
    }
  });

songsSetsRouter.route('/:id').delete(async (req, res, next) => {
  try {
    const { song_id, set_id } = parseParams(req.params.id);

    if (!set_id)
      return res.status(400).json({
        error: `Missing IDs in request params`
      });

    await CRUDService.deleteSSLink(req.app.get('db'), +song_id, +set_id);

    res.status(201).json({ message: 'Linkage deleted!' });
  } catch (error) {
    next(error);
  }
});

export default songsSetsRouter;
