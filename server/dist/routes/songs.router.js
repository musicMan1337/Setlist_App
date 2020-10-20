"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("../constants/table.constants");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const songsRouter = middlewares_1.Router();
songsRouter.use(middlewares_1.jsonBodyParser, middlewares_1.auth.requireAuth);
songsRouter
    .route('/')
    .get(async (req, res, next) => {
    try {
        const songs = await services_1.CRUDService.getAllData(req.app.get('db'), table_constants_1.SONGS_TABLE, res.user.id);
        if (songs.length === 0) {
            res.status(502).json([]);
            return;
        }
        res.status(200).json(services_1.SerializeService.serializeData(table_constants_1.SONGS_TABLE, songs));
    }
    catch (error) {
        next(error);
    }
})
    .post(middlewares_1.validate.songBody, async (req, res, next) => {
    try {
        res.newSong.user_id = res.user.id;
        const [song] = await services_1.CRUDService.createEntry(req.app.get('db'), table_constants_1.SONGS_TABLE, res.newSong);
        res.status(201).json(services_1.SerializeService.serializeSong(song));
    }
    catch (error) {
        next(error);
    }
});
songsRouter
    .route('/:id')
    .all(async (req, res, next) => {
    try {
        const song = await services_1.CRUDService.getById(req.app.get('db'), table_constants_1.SONGS_TABLE, Number(req.params.id), res.user.id);
        if (!song) {
            res.status(404).json({ message: 'Data not found' });
            return;
        }
        res.song = song;
        next();
    }
    catch (error) {
        next(error);
    }
})
    .get((_req, res) => res.status(200).json(services_1.SerializeService.serializeSong(res.song)))
    .patch(middlewares_1.validate.songBody, async (req, res) => {
    const [song] = await services_1.CRUDService.updateEntry(req.app.get('db'), table_constants_1.SONGS_TABLE, res.song.id, res.user.id, res.newSong);
    res.status(201).json(services_1.SerializeService.serializeSong(song));
})
    .delete(middlewares_1.jsonBodyParser, async (req, res, next) => {
    try {
        await services_1.CRUDService.deleteById(req.app.get('db'), table_constants_1.SONGS_TABLE, res.song.id);
        res.status(201).json({ message: `Successfully deleted` });
    }
    catch (error) {
        next(error);
    }
});
exports.default = songsRouter;
//# sourceMappingURL=songs.router.js.map