"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("../constants/table.constants");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const songsSetsRouter = middlewares_1.Router();
const parseParams = (params) => {
    const [song_id, set_id] = params.split('-');
    return { song_id, set_id };
};
songsSetsRouter.use(middlewares_1.jsonBodyParser, middlewares_1.auth.requireAuth);
songsSetsRouter
    .route('/')
    .get(async (req, res, next) => {
    try {
        const linkages = await services_1.CRUDService.getAllLinks(req.app.get('db'), table_constants_1.SONGS_SETS_TABLE);
        res.status(200).json(linkages);
    }
    catch (error) {
        next(error);
    }
})
    .post(middlewares_1.validate.songSetBody, async (req, res, next) => {
    try {
        const [linkage] = await services_1.CRUDService.createEntry(req.app.get('db'), table_constants_1.SONGS_SETS_TABLE, res.songSet);
        res.status(201).json({ linkage });
    }
    catch (error) {
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
        await services_1.CRUDService.deleteSSLink(req.app.get('db'), +song_id, +set_id);
        res.status(201).json({ message: 'Linkage deleted!' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = songsSetsRouter;
//# sourceMappingURL=songs_sets.router.js.map