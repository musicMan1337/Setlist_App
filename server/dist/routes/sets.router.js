"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("../constants/table.constants");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const setsRouter = middlewares_1.Router();
setsRouter.use(middlewares_1.jsonBodyParser, middlewares_1.auth.requireAuth);
setsRouter
    .route('/')
    .get(async (req, res, next) => {
    try {
        const emptySets = await services_1.CRUDService.getAllData(req.app.get('db'), table_constants_1.SETS_TABLE, res.user.id);
        if (emptySets.length === 0) {
            res.status(502).json([]);
            return;
        }
        const fullSets = await Promise.all(emptySets.map(async (set) => {
            set.songs = await services_1.QueryService.getSetSongTitles(req.app.get('db'), set.id);
            return set;
        }));
        res.json(services_1.SerializeService.serializeData(table_constants_1.SETS_TABLE, fullSets));
    }
    catch (error) {
        next(error);
    }
})
    .post(middlewares_1.validate.setBody, async (req, res, next) => {
    try {
        res.newSet.user_id = res.user.id;
        const [set] = await services_1.CRUDService.createEntry(req.app.get('db'), table_constants_1.SETS_TABLE, res.newSet);
        res.status(201).json(services_1.SerializeService.serializeSet(set));
    }
    catch (error) {
        next(error);
    }
});
setsRouter
    .route('/:id')
    .all(async (req, res, next) => {
    try {
        const set = await services_1.CRUDService.getById(req.app.get('db'), table_constants_1.SETS_TABLE, Number(req.params.id), res.user.id);
        if (!set)
            return res.status(404).json({ message: 'Data not found' });
        set.songs = await services_1.QueryService.getSetSongTitles(req.app.get('db'), set.id);
        res.setList = set;
    }
    catch (error) {
        next(error);
    }
    return next();
})
    .get((_req, res) => res.status(200).json(services_1.SerializeService.serializeSet(res.setList)))
    .patch(middlewares_1.validate.setBody, async (req, res) => {
    const [set] = await services_1.CRUDService.updateEntry(req.app.get('db'), table_constants_1.SETS_TABLE, res.setList.id, res.user.id, res.newSet);
    res.status(201).json(services_1.SerializeService.serializeSet(set));
})
    .delete(async (req, res) => {
    await services_1.CRUDService.deleteById(req.app.get('db'), table_constants_1.SETS_TABLE, res.setList.id);
    res.status(201).json({ message: `Successfully deleted` });
});
exports.default = setsRouter;
//# sourceMappingURL=sets.router.js.map