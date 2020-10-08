const ValidationMethods = {
  checkFields(object) {
    const fields = Object.entries(object);
    const keyError = fields.find(([key, value]) => value === undefined && key);
    return keyError;
  },

  errorResponse(res, keyError) {
    return res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });
  }
};

const loginBody = (req, res, next) => {
  const { user_name, password } = req.body;
  const loginUser = { user_name, password };

  const keyError = ValidationMethods.checkFields(loginUser);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  res.loginUser = loginUser;
  return next();
};

const songBody = (req, res, next) => {
  const { song_title, composer, arranger, description, user_id } = req.body;
  const newSong = { song_title, composer, arranger, description, user_id };

  const keyError = ValidationMethods.checkFields(newSong);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  res.newSong = newSong;
  return next();
};

const setBody = (req, res, next) => {
  const { set_name, description, user_id } = req.body;
  const newSet = { set_name, description, user_id };

  const keyError = ValidationMethods.checkFields(newSet);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  res.newSet = newSet;
  return next();
};

// TODO
const gigBody = (req, res, next) => {
  // const { song_title, composer, arranger, user_id } = req.body;
  // const newGig = { song_title, composer, arranger, user_id };

  // const keyError = ValidationMethods.checkFields(newGig);
  // if (keyError) return ValidationMethods.errorResponse(res, keyError);

  // res.newGig = newGig;
  return next();
};

module.exports = {
  loginBody,
  songBody,
  setBody,
  gigBody
};
