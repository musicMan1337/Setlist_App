import { RequestHandler, Response } from 'express';

import { SerializeService } from '../services';

const ValidationMethods = {
  checkFields(rawObject: object): string | null {
    const fields = Object.entries(rawObject);

    // 'id' is for testing only, therefore it's skipped here
    const keyError = fields.find(([key, value]) =>
      key === 'id' ? false : value === undefined
    );

    return keyError ? keyError[0] : null;
  },

  errorResponse(res: Response, keyError: string): void {
    res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });
  }
};

const loginBody: RequestHandler = (req, res, next) => {
  const { user_name, password, id } = req.body;
  const rawUser = { user_name, password };

  const keyError = ValidationMethods.checkFields(rawUser);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const loginUser = SerializeService.body.user(rawUser);

  if (id) loginUser.id = id;
  res.loginUser = loginUser;
  return next();
};

const songBody: RequestHandler = (req, res, next) => {
  const { song_title, composer, arranger, description, id } = req.body;
  const rawSong = { song_title, composer, arranger, description };

  const keyError = ValidationMethods.checkFields(rawSong);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const newSong = SerializeService.body.song(rawSong);

  if (id) newSong.id = id;
  res.newSong = newSong;
  return next();
};

const songSetBody: RequestHandler = (req, res, next) => {
  const { song_id, set_id } = req.body;
  const songSet = { song_id, set_id };

  const keyError = ValidationMethods.checkFields(songSet);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  res.songSet = songSet;
  return next();
};

const setBody: RequestHandler = (req, res, next) => {
  const { set_name, description, id } = req.body;
  const rawSet = { set_name, description, id };

  const keyError = ValidationMethods.checkFields(rawSet);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const newSet = SerializeService.body.set(rawSet);

  if (id) newSet.id = id;
  res.newSet = newSet;
  return next();
};

// TODO - Feature request
const gigBody: RequestHandler = (req, res, next) => {
  const { venue, gig_date, start_time, end_time, id } = req.body;
  const rawGig = { venue, gig_date, start_time, end_time };

  const keyError = ValidationMethods.checkFields(rawGig);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const newGig = SerializeService.body.gig(rawGig);

  if (id) newGig.id = id;
  res.newGig = newGig;
  return next();
};

export default {
  loginBody,
  songBody,
  setBody,
  songSetBody,
  gigBody
};
