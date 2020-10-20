"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("../constants/table.constants");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const gigsRouter = middlewares_1.Router();
gigsRouter.use(middlewares_1.jsonBodyParser, middlewares_1.auth.requireAuth);
gigsRouter
    .route('/')
    .get(async (req, res, next) => {
    try {
        const emptyGigs = await services_1.CRUDService.getAllData(req.app.get('db'), table_constants_1.GIGS_TABLE, res.user.id);
        if (emptyGigs.length === 0) {
            res.status(502).json([]);
            return;
        }
        const halfGigs = await Promise.all(emptyGigs.map(async (gig) => {
            gig.sets = await services_1.QueryService.getGigSetsTitles(req.app.get('db'), gig.id);
            return gig;
        }));
        const fullGigs = await Promise.all(halfGigs.map(async (gig) => {
            gig.sets = await Promise.all(gig.sets.map(async (set) => {
                set.songs = await services_1.QueryService.getSetSongTitles(req.app.get('db'), set.id);
                return set;
            }));
            return gig;
        }));
        res.json(services_1.SerializeService.serializeData(table_constants_1.GIGS_TABLE, fullGigs));
    }
    catch (error) {
        next(error);
    }
})
    .post(middlewares_1.validate.gigBody, async (req, res, next) => {
    try {
        res.newGig.user_id = res.user.id;
        const [gig] = await services_1.CRUDService.createEntry(req.app.get('db'), table_constants_1.GIGS_TABLE, res.newGig);
        res.status(201).json(services_1.SerializeService.serializeGig(gig));
    }
    catch (error) {
        next(error);
    }
});
gigsRouter
    .route('/:id')
    .all(async (req, res, next) => {
    try {
        const gig = await services_1.CRUDService.getById(req.app.get('db'), table_constants_1.GIGS_TABLE, Number(req.params.id), res.user.id);
        if (!gig)
            return res.status(404).json({ message: 'Data not found' });
        gig.sets = await services_1.QueryService.getGigSetsTitles(req.app.get('db'), gig.id);
        gig.sets = await Promise.all(gig.sets.map(async (set) => {
            set.songs = await services_1.QueryService.getSetSongTitles(req.app.get('db'), set.id);
            return set;
        }));
        res.gig = gig;
    }
    catch (error) {
        next(error);
    }
    return next();
})
    .get((_req, res) => res.status(200).json(services_1.SerializeService.serializeGig(res.gig)))
    .patch(middlewares_1.validate.gigBody, async (req, res) => {
    const [gig] = await services_1.CRUDService.updateEntry(req.app.get('db'), table_constants_1.GIGS_TABLE, res.gig.id, res.user.id, res.newGig);
    res.status(201).json(services_1.SerializeService.serializeGig(gig));
})
    .delete(async (req, res) => {
    await services_1.CRUDService.deleteById(req.app.get('db'), table_constants_1.GIGS_TABLE, res.gig.id);
    res.status(201).json({ message: `Successfully deleted` });
});
exports.default = gigsRouter;
//# sourceMappingURL=gigs.router.js.map