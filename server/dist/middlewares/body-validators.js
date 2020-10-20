"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const ValidationMethods = {
    checkFields(rawObject) {
        const fields = Object.entries(rawObject);
        const keyError = fields.find(([key, value]) => key === 'id' ? false : value === undefined);
        return keyError ? keyError[0] : null;
    },
    errorResponse(res, keyError) {
        res.status(400).json({
            error: `Missing '${keyError}' in request body`
        });
    }
};
const loginBody = (req, res, next) => {
    const { user_name, password, id } = req.body;
    const rawUser = { user_name, password };
    const keyError = ValidationMethods.checkFields(rawUser);
    if (keyError)
        return ValidationMethods.errorResponse(res, keyError);
    const loginUser = services_1.SerializeService.body.user(rawUser);
    if (id)
        loginUser.id = id;
    res.loginUser = loginUser;
    return next();
};
const songBody = (req, res, next) => {
    const { song_title, composer, arranger, description, id } = req.body;
    const rawSong = { song_title, composer, arranger, description };
    const keyError = ValidationMethods.checkFields(rawSong);
    if (keyError)
        return ValidationMethods.errorResponse(res, keyError);
    const newSong = services_1.SerializeService.body.song(rawSong);
    if (id)
        newSong.id = id;
    res.newSong = newSong;
    return next();
};
const songSetBody = (req, res, next) => {
    const { song_id, set_id } = req.body;
    const songSet = { song_id, set_id };
    const keyError = ValidationMethods.checkFields(songSet);
    if (keyError)
        return ValidationMethods.errorResponse(res, keyError);
    res.songSet = songSet;
    return next();
};
const setBody = (req, res, next) => {
    const { set_name, description, id } = req.body;
    const rawSet = { set_name, description, id };
    const keyError = ValidationMethods.checkFields(rawSet);
    if (keyError)
        return ValidationMethods.errorResponse(res, keyError);
    const newSet = services_1.SerializeService.body.set(rawSet);
    if (id)
        newSet.id = id;
    res.newSet = newSet;
    return next();
};
const gigBody = (req, res, next) => {
    const { venue, gig_date, start_time, end_time, id } = req.body;
    const rawGig = { venue, gig_date, start_time, end_time };
    const keyError = ValidationMethods.checkFields(rawGig);
    if (keyError)
        return ValidationMethods.errorResponse(res, keyError);
    const newGig = services_1.SerializeService.body.gig(rawGig);
    if (id)
        newGig.id = id;
    res.newGig = newGig;
    return next();
};
exports.default = {
    loginBody,
    songBody,
    setBody,
    songSetBody,
    gigBody
};
//# sourceMappingURL=body-validators.js.map